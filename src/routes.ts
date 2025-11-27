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
import { FocusTimeController } from './controllers/focus.controller.js';

export const router = Router();

const habitsController = new HabitsController();
const focusTimeController = new FocusTimeController();

router.get('/', (_req, res) => {
  const { name, version, description } = packageJson;

  res.status(200).json({
    name,
    version,
    description,
  });
});

router.get('/habits', (req, res) => {
  return habitsController.index(req, res);
});

router.get('/habits/:id/metrics', (req, res) => {
  return habitsController.metrics(req, res);
});

router.post('/habits', (req, res) => {
  return habitsController.store(req, res);
});

router.delete('/habits/:id', (req, res) => {
  return habitsController.delete(req, res);
});

router.patch('/habits/:id/toggle', (req, res) => {
  return habitsController.toggle(req, res);
});

router.post('/focus-times', (req, res) => {
  return focusTimeController.store(req, res);
});

router.get('/focus-times/metrics/month', (req, res) => {
  return focusTimeController.metricsByMonth(req, res);
});
