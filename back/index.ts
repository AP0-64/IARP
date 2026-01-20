import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import discussionRouter from './routes/discussionsRouter';

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

// CORS : autorise explicitement ton front Vercel + localhost
const allowedOrigins = [
  'https://pli-nine.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn('CORS blocked for origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

// Routes API
app.use('/api/discussions', discussionRouter);

// Global error handlers
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', reason => {
  console.error('Unhandled Rejection:', reason);
});

// Healthcheck & root
app.get('/', (_req, res) => {
  res.status(200).send('Backend OK');
});

app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.info(`Serveur backend en ligne sur http://localhost:${port}`);
  console.info('CORS autorisé pour :', allowedOrigins);
});
