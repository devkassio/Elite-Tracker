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
import express from 'express';
import { router } from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
