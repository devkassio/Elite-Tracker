/**
 * Elite Tracker API
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 * @license MIT
 *
 * NOTICE: This code is protected by copyright law.
 * Unauthorized use, distribution, or modification without proper attribution
 * is prohibited and may result in legal action.
 */

import dotenv from 'dotenv';

// IMPORTANTE: dotenv.config() deve ser chamado ANTES de importar qualquer módulo
// que use process.env, caso contrário as variáveis estarão undefined
dotenv.config();

import cors from 'cors';

import express from 'express';
import { setupMongo } from './database/index.js';
import { router } from './routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Lista de origens permitidas
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://devkassio.github.io',
  'https://devkassio.github.io/Elite-Tracker-Front',
  process.env.FRONTEND_URL,
].filter(Boolean);

setupMongo()
  .then(() => {
    app.use(
      cors({
        origin: (origin, callback) => {
          // Permitir requisições sem origin (mobile apps, Postman, etc)
          if (!origin) return callback(null, true);

          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(router);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.log('❌ Failed to set up the database:', error);
    process.exit(1);
  });
