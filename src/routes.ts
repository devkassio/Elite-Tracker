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
import { AuthController } from './controllers/auth.controller.js';
import { FocusTimeController } from './controllers/focus.controller.js';
import { HabitsController } from './controllers/habits.controller.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

export const router = Router();

const habitsController = new HabitsController();
const focusTimeController = new FocusTimeController();
const authController = new AuthController();

router.get('/', (_req, res) => {
  const { name, version, description } = packageJson;

  res.status(200).json({
    name,
    version,
    description,
  });
});

router.get('/auth', (req, res) => {
  return authController.auth(req, res);
});

router.get('/auth/callback', (req, res) => {
  return authController.authCallback(req, res);
});

router.get('/habits', authMiddleware, (req, res) => {
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

router.get('/focus-times', (req, res) => {
  return focusTimeController.index(req, res);
});

router.get('/focus-times/metrics', (req, res) => {
  return focusTimeController.metricsByMonth(req, res);
});
