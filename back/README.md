# IARP Backend

API Backend du projet IARP construit avec Express.js et TypeScript.

## Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- PostgreSQL (v12 ou supérieur)

## Installation des dépendances

Depuis la racine du projet, installez les dépendances du backend et de la racine :

```bash
npm run install:all
```

Ou installez manuellement :

```bash
npm install && cd back && npm install
```

Copiez le fichier `env_exemple.txt` en `.env` et remplissez vos identifiants de base de données :

```bash
cp env_exemple.txt .env
```

Éditez `.env` avec votre configuration de base de données :

```env
# Configuration de la base de données
DATABASE_URL=postgresql://username:password@hostname:5432/dbname

# Application
PORT=4000
NODE_ENV=development
```

## Initialiser la base de données

Exécutez le schéma SQL pour créer les tables :

```bash
psql -U postgres -d nom_base_de_donnees -f ../init/schema.sql
```

## Développement

### Démarrer le serveur en mode développement

Depuis la racine du projet :

```bash
npm run dev
```

Le serveur s'exécutera sur `http://localhost:4000` par défaut.

### Construire pour la production

Depuis la racine du projet :

```bash
npm run build
```

## Structure du projet

```txt
back/
├── cruds/              # Opérations CRUD de la base de données
│   ├── users.ts
│   ├── characters.ts
│   ├── conversations.ts
│   └── messages.ts
├── models/             # Interfaces TypeScript
│   ├── users.ts
│   ├── characters.ts
│   ├── conversations.ts
│   └── messages.ts
├── routes/             # Gestionnaires de routes Express
│   ├── usersRouter.ts
│   ├── charactersRouter.ts
│   ├── conversationsRouter.ts
│   └── messagesRouter.ts
├── validators/         # Validation des entrées
│   └── index.ts
├── db-config.ts        # Configuration de la base de données
├── index.ts            # Point d'entrée de l'application
├── env_exemple.txt     # Modèle de variables d'environnement
└── package.json        # Dépendances du projet
```

## Points de terminaison API

### Utilisateurs

- `GET /api/users` - Récupérer tous les utilisateurs
- `GET /api/users/:id` - Récupérer un utilisateur par ID
- `POST /api/users` - Créer un nouvel utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Personnages

- `GET /api/characters` - Récupérer tous les personnages
- `GET /api/characters/:id` - Récupérer un personnage par ID
- `POST /api/characters` - Créer un nouveau personnage
- `PUT /api/characters/:id` - Mettre à jour un personnage
- `DELETE /api/characters/:id` - Supprimer un personnage

### Conversations

- `GET /api/conversations` - Récupérer toutes les conversations
- `GET /api/conversations/:id` - Récupérer une conversation par ID
- `GET /api/conversations/user/:userId` - Récupérer les conversations d'un utilisateur
- `POST /api/conversations` - Créer une nouvelle conversation
- `DELETE /api/conversations/:id` - Supprimer une conversation

### Messages

- `GET /api/messages` - Récupérer tous les messages
- `GET /api/messages/:id` - Récupérer un message par ID
- `GET /api/messages/conversation/:conversationId` - Récupérer les messages d'une conversation
- `POST /api/messages` - Créer un nouveau message
- `DELETE /api/messages/:id` - Supprimer un message

### Vérification de la santé

- `GET /health` - Vérifier l'état du serveur

## Gestion des erreurs

L'API retourne les erreurs dans un format JSON cohérent :

```json
{
  "errorMessage": "Description de l'erreur"
}
```

- **400 Mauvaise requête** - Validation de l'entrée échouée
- **404 Non trouvé** - Ressource non trouvée ou route inexistante
- **500 Erreur serveur interne** - Erreur du serveur

## Notes de développement

- Toutes les entrées sont validées à l'aide du module `validators`
- Les noms des champs de la base de données utilisent `snake_case` tandis que TypeScript utilise `camelCase`
- La conversion automatique entre les formats se fait dans la couche CRUD
- Ne validez jamais les fichiers `.env` ; utilisez `env_exemple.txt` comme modèle
