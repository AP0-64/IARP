# IARP

Application backend avec Node.js + Express + TypeScript.

## Installation

Pour installer les dépendances du projet, utilisez la commande suivante à la racine du projet :

```bash
npm run install:all
```

Pour upgrader les dépendances du projet, utilisez la commande suivante à la racine du projet :

```bash
npm run update:all
```

---

## Commandes disponibles

### Démarrage

| Commande | Utilité |
| -------- | ------- |
| `npm run dev` | Démarre le backend (ts-node sur port 4000) |

### Build

| Commande | Utilité |
| -------- | ------- |
| `npm run build` | Build le backend pour la production (compile TypeScript) |

### Linting et formatage

| Commande | Utilité |
| -------- | ------- |
| `npm run lint` | Vérifie la qualité du code (ESLint) |
| `npm run lint:fix` | Corrige automatiquement les erreurs de linting et formate le code (Prettier) |

---

## Base de données

### Initialisation du schéma

Le schéma SQL est disponible dans le fichier `init/schema.sql`.

---

## Structure du projet

```txt
.
├── back/                 # Backend (Node.js + Express + TypeScript)
│   ├── cruds/            # Opérations CRUD de la base de données
│   ├── models/           # Interfaces TypeScript des modèles
│   ├── routes/           # Gestionnaires de routes Express
│   ├── validators/       # Validation des entrées
│   ├── db-config.ts      # Configuration de la base de données
│   ├── index.ts          # Point d'entrée de l'application
│   ├── package.json      # Dépendances du backend
│   ├── tsconfig.json     # Configuration TypeScript
│   └── README.md         # Documentation du backend
├── init/                 # Scripts d'initialisation
│   └── schema.sql        # Schéma de base de données
├── package.json          # Configuration des commandes racine
├── tsconfig.json         # Configuration TypeScript racine
└── eslint.config.mjs     # Configuration ESLint
```
