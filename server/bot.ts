import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder, Message } from 'discord.js';
import { storage } from './storage';
import { onePieceCharacters, type GameSession, type OnePieceCharacter } from '@shared/schema';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=discord',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Discord not connected');
  }
  return accessToken;
}

function getRandomCharacter(): OnePieceCharacter {
  return onePieceCharacters[Math.floor(Math.random() * onePieceCharacters.length)];
}

function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
}

function checkAnswer(answer: string, character: OnePieceCharacter): boolean {
  const normalized = normalizeAnswer(answer);
  return character.aliases.some(alias => normalizeAnswer(alias) === normalized);
}

export async function startBot() {
  const token = await getAccessToken();
  
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });

  // Register slash commands
  client.once('ready', async () => {
    console.log(`✅ Bot connecté en tant que ${client.user?.tag}`);
    
    const commands = [
      new SlashCommandBuilder()
        .setName('prime')
        .setDescription('Devine le personnage de One Piece à partir de sa prime !'),
      new SlashCommandBuilder()
        .setName('score')
        .setDescription('Affiche ton score ou le classement')
        .addStringOption(option =>
          option.setName('type')
            .setDescription('Type de score à afficher')
            .addChoices(
              { name: 'Mon score', value: 'me' },
              { name: 'Classement', value: 'leaderboard' }
            )
        ),
      new SlashCommandBuilder()
        .setName('abandon')
        .setDescription('Abandonne la partie en cours')
    ].map(command => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(token);

    try {
      console.log('🔄 Enregistrement des commandes slash...');
      
      if (client.application) {
        await rest.put(
          Routes.applicationCommands(client.application.id),
          { body: commands }
        );
        console.log('✅ Commandes slash enregistrées !');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'enregistrement des commandes:', error);
    }
  });

  // Handle /prime command
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'prime') {
      const userId = interaction.user.id;
      const channelId = interaction.channelId;

      // Check if user already has an active game
      const existingSession = await storage.getGameSession(userId, channelId);
      if (existingSession) {
        await interaction.reply({
          content: `❌ Tu as déjà une partie en cours ! La prime actuelle est de **${existingSession.currentCharacter.bountyText} Berry**.\nUtilise \`/abandon\` pour abandonner.`,
          ephemeral: true
        });
        return;
      }

      // Start new game
      const character = getRandomCharacter();
      const session: GameSession = {
        userId,
        channelId,
        currentCharacter: character,
        attempts: 0,
        startTime: Date.now()
      };

      await storage.createGameSession(session);

      const embed = new EmbedBuilder()
        .setColor(0xFF6B6B)
        .setTitle('🏴‍☠️ Devine le Personnage de One Piece !')
        .setDescription(`La prime de ce personnage est de **${character.bountyText} Berry** 💰\n\nÉcris le nom du personnage dans le chat !`)
        .setFooter({ text: 'Utilise /abandon pour abandonner la partie' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'abandon') {
      const userId = interaction.user.id;
      const channelId = interaction.channelId;

      const session = await storage.getGameSession(userId, channelId);
      if (!session) {
        await interaction.reply({
          content: '❌ Tu n\'as pas de partie en cours !',
          ephemeral: true
        });
        return;
      }

      await storage.deleteGameSession(userId, channelId);

      const embed = new EmbedBuilder()
        .setColor(0x95A5A6)
        .setTitle('🏳️ Partie abandonnée')
        .setDescription(`La réponse était **${session.currentCharacter.name}** !`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'score') {
      const type = interaction.options.getString('type') || 'me';
      const userId = interaction.user.id;

      if (type === 'me') {
        const userScore = await storage.getUserScore(userId);
        
        if (!userScore || userScore.totalGames === 0) {
          await interaction.reply({
            content: '📊 Tu n\'as pas encore joué ! Utilise `/prime` pour commencer.',
            ephemeral: true
          });
          return;
        }

        const successRate = Math.round((userScore.correctGuesses / userScore.totalGames) * 100);
        const fastestTimeText = userScore.fastestTime 
          ? `${(userScore.fastestTime / 1000).toFixed(1)}s`
          : 'N/A';

        const embed = new EmbedBuilder()
          .setColor(0x3498DB)
          .setTitle(`📊 Score de ${userScore.username}`)
          .addFields(
            { name: '✅ Bonnes réponses', value: `${userScore.correctGuesses}`, inline: true },
            { name: '🎮 Parties jouées', value: `${userScore.totalGames}`, inline: true },
            { name: '📈 Taux de réussite', value: `${successRate}%`, inline: true },
            { name: '⚡ Temps le plus rapide', value: fastestTimeText, inline: true }
          )
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      } else {
        const topScores = await storage.getTopScores(10);
        
        if (topScores.length === 0) {
          await interaction.reply({
            content: '📊 Aucun score pour le moment ! Soyez le premier à jouer !',
            ephemeral: true
          });
          return;
        }

        const leaderboardText = topScores.map((score, index) => {
          const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
          const successRate = Math.round((score.correctGuesses / score.totalGames) * 100);
          return `${medal} **${score.username}** - ${score.correctGuesses} victoires (${successRate}%)`;
        }).join('\n');

        const embed = new EmbedBuilder()
          .setColor(0xF39C12)
          .setTitle('🏆 Classement des Meilleurs Pirates')
          .setDescription(leaderboardText)
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      }
    }
  });

  // Handle message responses
  client.on('messageCreate', async (message: Message) => {
    // Ignore bot messages
    if (message.author.bot) return;

    const userId = message.author.id;
    const channelId = message.channelId;

    // Check if user has an active game session
    const session = await storage.getGameSession(userId, channelId);
    if (!session) return;

    session.attempts++;

    // Check if answer is correct
    if (checkAnswer(message.content, session.currentCharacter)) {
      const timeTaken = Date.now() - session.startTime;
      
      // Update user score
      let userScore = await storage.getUserScore(userId);
      if (!userScore) {
        userScore = {
          userId,
          username: message.author.username,
          correctGuesses: 0,
          totalGames: 0
        };
      }

      userScore.correctGuesses++;
      userScore.totalGames++;
      userScore.username = message.author.username; // Update username in case it changed
      
      if (!userScore.fastestTime || timeTaken < userScore.fastestTime) {
        userScore.fastestTime = timeTaken;
      }

      await storage.updateUserScore(userScore);
      await storage.deleteGameSession(userId, channelId);

      const embed = new EmbedBuilder()
        .setColor(0x2ECC71)
        .setTitle('🎉 Bravo ! Réponse correcte !')
        .setDescription(`C'était bien **${session.currentCharacter.name}** avec une prime de **${session.currentCharacter.bountyText} Berry** !`)
        .addFields(
          { name: '⏱️ Temps', value: `${(timeTaken / 1000).toFixed(1)}s`, inline: true },
          { name: '🎯 Tentatives', value: `${session.attempts}`, inline: true },
          { name: '📊 Ton score', value: `${userScore.correctGuesses}/${userScore.totalGames} victoires`, inline: true }
        )
        .setFooter({ text: 'Utilise /prime pour une nouvelle partie !' })
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } else {
      // Wrong answer
      const hintsThreshold = [3, 5, 7];
      let hint = '';

      if (session.attempts === hintsThreshold[0]) {
        const nameLength = session.currentCharacter.name.length;
        hint = `💡 Indice : Le nom du personnage contient ${nameLength} lettres.`;
      } else if (session.attempts === hintsThreshold[1]) {
        const firstLetter = session.currentCharacter.name[0];
        hint = `💡 Indice : Le nom commence par "${firstLetter}".`;
      } else if (session.attempts === hintsThreshold[2]) {
        const nameParts = session.currentCharacter.name.split(' ');
        hint = `💡 Indice : Le nom contient ${nameParts.length} mot${nameParts.length > 1 ? 's' : ''}.`;
      }

      const responses = [
        '❌ Non, ce n\'est pas ça ! Essaie encore.',
        '❌ Pas tout à fait... Continue !',
        '❌ Mauvaise réponse ! Tu peux le faire !',
        '❌ Ce n\'est pas le bon personnage !'
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      const replyText = hint ? `${response}\n${hint}` : response;

      await message.reply(replyText);
    }
  });

  await client.login(token);
  return client;
}
