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
| `npm run dev` | Démarre le backend (ts-node sur port 3000) |

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

### Mot de passe de la base de données

Le mot de passe par défaut pour la base de données est `gQE?p?bL@dBj5jge`.

### Initialisation du schéma

Le schéma SQL est disponible dans le fichier `init/schema.sql`.

---

## Structure du projet

```txt
.
├── back/                 # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   ├── cruds/            # Opérations CRUD
│   ├── models/           # Modèles de données
│   └── routes/           # Routes API
└── init/                 # Scripts d'initialisation
    └── schema.sql        # Schéma de base de données
```
