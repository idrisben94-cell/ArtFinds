import { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder, 
  EmbedBuilder, 
  Message,
  GuildMember
} from 'discord.js';
import { storage } from './storage';
import { onePieceCharacters, type GameSession, type OnePieceCharacter } from '@shared/schema';

function getRandomCharacter(): OnePieceCharacter {
  return onePieceCharacters[Math.floor(Math.random() * onePieceCharacters.length)];
}

function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkAnswer(answer: string, character: OnePieceCharacter): boolean {
  const normalized = normalizeAnswer(answer);
  if (normalizeAnswer(character.name) === normalized) return true;
  return character.aliases.some(alias => normalizeAnswer(alias) === normalized);
}

export async function startBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) throw new Error('DISCORD_BOT_TOKEN non configuré. Veuillez ajouter votre token de bot Discord.');

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });

  // === Register slash commands ===
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

  // === Handle / commands ===
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const userId = interaction.user.id;
    const channelId = interaction.channelId;
    const guildMember = interaction.member as GuildMember;
    const username = guildMember?.nickname || interaction.user.username;

    // --- /prime ---
    if (interaction.commandName === 'prime') {
      const existingSession = await storage.getGameSession(userId, channelId);
      if (existingSession) {
        await interaction.reply({
          content: `❌ Tu as déjà une partie en cours ! La prime actuelle est de **${existingSession.currentCharacter.bountyText} Berry**.\nUtilise \`/abandon\` pour abandonner.`,
          ephemeral: true
        });
        return;
      }

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

    // --- /abandon ---
    if (interaction.commandName === 'abandon') {
      const session = await storage.getGameSession(userId, channelId);
      if (!session) {
        await interaction.reply({ content: '❌ Tu n\'as pas de partie en cours !', ephemeral: true });
        return;
      }

      let userScore = await storage.getUserScore(userId);
      if (!userScore) userScore = { userId, username, correctGuesses: 0, totalGames: 0 };
      userScore.totalGames++;
      userScore.username = username;
      await storage.updateUserScore(userScore);
      await storage.deleteGameSession(userId, channelId);

      const embed = new EmbedBuilder()
        .setColor(0x95A5A6)
        .setTitle('🏳️ Partie abandonnée')
        .setDescription(`La réponse était **${session.currentCharacter.name}** !`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }

    // --- /score ---
    if (interaction.commandName === 'score') {
      const type = interaction.options.getString('type') || 'me';

      if (type === 'me') {
        const userScore = await storage.getUserScore(userId);
        if (!userScore || userScore.totalGames === 0) {
          await interaction.reply({ content: '📊 Tu n\'as pas encore joué ! Utilise `/prime` pour commencer.', ephemeral: true });
          return;
        }

        const embed = new EmbedBuilder()
          .setColor(0x3498DB)
          .setTitle(`📊 Score de ${username}`)
          .addFields(
            { name: '✅ Bonnes réponses', value: `${userScore.correctGuesses}`, inline: true },
            { name: '🎮 Parties jouées', value: `${userScore.totalGames}`, inline: true }
          )
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      } else {
        const topScores = await storage.getTopScores(10);
        if (topScores.length === 0) {
          await interaction.reply({ content: '📊 Aucun score pour le moment ! Soyez le premier à jouer !', ephemeral: true });
          return;
        }

        const leaderboardText = topScores.map((score, index) => {
          const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
          return `${medal} **${score.username}** - ${score.correctGuesses} victoires`;
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

  // === Handle messages ===
  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;

    const userId = message.author.id;
    const channelId = message.channelId;
    const username = message.member?.nickname || message.author.username;
    const session = await storage.getGameSession(userId, channelId);
    if (!session) return;

    session.attempts++;

    if (checkAnswer(message.content, session.currentCharacter)) {
      const timeTaken = Date.now() - session.startTime;
      let userScore = await storage.getUserScore(userId);
      if (!userScore) userScore = { userId, username, correctGuesses: 0, totalGames: 0 };

      userScore.correctGuesses++;
      userScore.totalGames++;
      userScore.username = username;
      if (!userScore.fastestTime || timeTaken < userScore.fastestTime) userScore.fastestTime = timeTaken;

      await storage.updateUserScore(userScore);
      await storage.deleteGameSession(userId, channelId);

      const embed = new EmbedBuilder()
        .setColor(0x2ECC71)
        .setTitle('🎉 Bravo ! Réponse correcte !')
        .setDescription(`C'était bien **${session.currentCharacter.name}** avec une prime de **${session.currentCharacter.bountyText} Berry** !`)
        .addFields(
          { name: '🎯 Tentatives', value: `${session.attempts}`, inline: true },
          { name: '📊 Ton score', value: `${userScore.correctGuesses}/${userScore.totalGames} victoires`, inline: true }
        )
        .setFooter({ text: 'Utilise /prime pour une nouvelle partie !' })
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } else {
      const hintsThreshold = [2, 4, 5];
      let hint = '';
      if (session.attempts === hintsThreshold[0]) hint = `💡 Indice : Le nom du personnage contient ${session.currentCharacter.name.length} lettres.`;
      else if (session.attempts === hintsThreshold[1]) hint = `💡 Indice : Le nom commence par "${session.currentCharacter.name[0]}".`;
      else if (session.attempts === hintsThreshold[2]) {
        const parts = session.currentCharacter.name.split(' ');
        hint = `💡 Indice : Le nom contient ${parts.length} mot${parts.length > 1 ? 's' : ''}.`;
      }

      const responses = [
        '❌ Non, ce n\'est pas ça ! Essaie encore.',
        '❌ Pas tout à fait... Continue !',
        '❌ Mauvaise réponse ! Tu peux le faire !',
        '❌ Ce n\'est pas le bon personnage !'
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];
      await message.reply(hint ? `${response}\n${hint}` : response);
    }
  });

  await client.login(token);
  return client;
}

// === Lancement du bot ===
startBot().catch(err => {
  console.error('Erreur lors du démarrage du bot :', err);
});

