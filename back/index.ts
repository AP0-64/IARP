import express from 'express';
import dotenv from 'dotenv';

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

// Middleware
app.use(express.json());

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
app.use((req: express.Request, res: express.Response) => {
  res
    .status(404)
    .json({ errorMessage: `Route ${req.method} ${req.path} not found` });
});

// Global error handler middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error('Error:', err);
  res.status(500).json({
    errorMessage: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  });
});

// Global process error handlers
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error | string) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Test database connection
connection.query('SELECT NOW()', (err: Error | null) => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
  console.info('Database connected successfully');
});

// Start server
const server = app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.info('HTTP server closed');
    connection.end();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.info('HTTP server closed');
    connection.end();
    process.exit(0);
  });
});
