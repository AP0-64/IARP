import express from 'express';
import dotenv from 'dotenv';

import usersRouter from './routes/usersRouter';
import charactersRouter from './routes/charactersRouter';
import conversationsRouter from './routes/conversationsRouter';
import messagesRouter from './routes/messagesRouter';

// Charger les variables d'environnement
dotenv.config();

// Valider les variables d'environnement critiques
const requiredEnvVars = [
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    "Erreur: Variables d'environnement manquantes:",
    missingEnvVars.join(', ')
  );
  process.exit(1);
}

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

// Routes API
app.use('/api/users', usersRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/messages', messagesRouter);

// Global error handlers
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', reason => {
  console.error('Unhandled Rejection:', reason);
});

// Healthcheck & root
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.info(`Serveur backend en ligne sur http://localhost:${port}`);
});
