# Bot Discord One Piece - Jeu de Primes

## Description
Bot Discord de mini-jeux basé sur One Piece. Le bot propose un jeu où les utilisateurs doivent deviner le nom d'un personnage à partir de sa prime (bounty).

## Fonctionnalités

### Commandes disponibles
- `/prime` - Lance une nouvelle partie où le bot affiche une prime et l'utilisateur doit deviner le personnage
- `/score [type]` - Affiche les scores (mon score personnel ou le classement général)
- `/abandon` - Abandonne la partie en cours

### Système de jeu
1. L'utilisateur lance `/prime`
2. Le bot affiche une prime en Berry
3. L'utilisateur écrit le nom du personnage dans le chat
4. Le bot valide la réponse et donne des indices après plusieurs tentatives incorrectes
5. Les scores sont enregistrés (bonnes réponses, parties jouées, temps de réponse)

### Indices progressifs
- Après 3 tentatives : Nombre de lettres du nom
- Après 5 tentatives : Première lettre du nom
- Après 7 tentatives : Nombre de mots dans le nom

### Personnages inclus
Le bot contient 20 personnages de One Piece avec leurs primes officielles :
- Équipage du Chapeau de Paille (Luffy, Zoro, Sanji, etc.)
- Empereurs (Kaido, Big Mom, Shanks, Barbe Noire)
- Corsaires (Mihawk, Hancock, Crocodile, Buggy)
- Autres pirates importants (Law, Kid)

## Architecture technique

### Stack
- Node.js avec TypeScript
- Discord.js v14
- Stockage en mémoire (MemStorage)
- Express (serveur minimal pour Replit)

### Structure des données
- **GameSession** : Session de jeu active par utilisateur/canal
- **UserScore** : Scores et statistiques des joueurs
- **OnePieceCharacter** : Informations des personnages (nom, prime, alias)

### Fichiers principaux
- `server/bot.ts` : Logique principale du bot Discord
- `server/storage.ts` : Gestion du stockage en mémoire
- `shared/schema.ts` : Définitions de types et données des personnages
- `server/index.ts` : Point d'entrée qui démarre le bot

## Configuration

Le bot utilise l'intégration Discord de Replit qui gère automatiquement :
- L'authentification OAuth
- Le rafraîchissement des tokens
- La connexion sécurisée

### Permissions requises
- Lire les messages dans les serveurs
- Envoyer des messages
- Utiliser les commandes slash
- Accéder au contenu des messages

## Utilisation

1. Le bot se connecte automatiquement au démarrage
2. Les commandes slash sont enregistrées globalement
3. Les utilisateurs peuvent jouer dans n'importe quel canal où le bot a accès
4. Chaque utilisateur peut avoir une seule partie active par canal

## Fonctionnalités futures possibles
- Système de difficultés (easy/medium/hard basé sur la notoriété)
- Mode multi-joueurs (compétition)
- Plus de personnages
- Images des personnages dans les embeds
- Système de récompenses/achievements
- Mode duel entre deux joueurs
