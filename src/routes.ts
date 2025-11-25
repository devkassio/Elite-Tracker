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

export const router = Router();

const habits = [];

router.get('/', (_req, res) => {
  const { name, version, description } = packageJson;

  res.status(200).json({
    name,
    version,
    description,
  });
});

router.post('/habits', (req, res) => {
  const { name } = req.body;

  const newHabit = { name };

  habits.push(newHabit);

  res.status(201).json(newHabit);
});
