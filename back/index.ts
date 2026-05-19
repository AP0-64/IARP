import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import usersRouter from './routes/usersRouter';
import charactersRouter from './routes/charactersRouter';
import conversationsRouter from './routes/conversationsRouter';
import messagesRouter from './routes/messagesRouter';
import connection from './db-config';

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

const port = process.env.PORT || '3000';

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limiter chaque IP à 100 requêtes par fenêtre
  message:
    'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
});

// Middleware
app.use(express.json());
app.use('/api/', limiter);

// Routes API
app.use('/api/users', usersRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/messages', messagesRouter);

// Healthcheck endpoint
app.get('/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res
    .status(404)
    .json({ errorMessage: `Route ${_req.method} ${_req.path} non trouvée` });
});

// Global error handler middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error('Erreur:', err);
  res.status(500).json({
    errorMessage: 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  });
});

// Global process error handlers
process.on('uncaughtException', (err: Error) => {
  console.error('Exception non gérée:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error | string) => {
  console.error('Promesse rejetée non gérée:', reason);
  process.exit(1);
});

// Test database connection
connection.query('SELECT NOW()', (err: Error | null) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.message);
    process.exit(1);
  }
  console.info('Base de données connectée avec succès');
});

// Start server
const server = app.listen(port, () => {
  console.info(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('Signal SIGTERM reçu: fermeture du serveur HTTP');
  server.close(() => {
    console.info('Serveur HTTP fermé');
    connection.end();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('Signal SIGINT reçu: fermeture du serveur HTTP');
  server.close(() => {
    console.info('Serveur HTTP fermé');
    connection.end();
    process.exit(0);
  });
});
