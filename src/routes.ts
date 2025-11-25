/**
 * Elite Tracker API - Routes
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import { Router } from 'express';
import packageJson from '../package.json' with { type: 'json' };
import { HabitsController } from './controllers/habits.controller.js';

export const router = Router();

const habitsController = new HabitsController();

router.get('/', (_req, res) => {
  const { name, version, description } = packageJson;

  res.status(200).json({
    name,
    version,
    description,
  });
});

router.post('/habits', (req, res) => {
  return habitsController.store(req, res);
});
