/**
 * Elite Tracker API - Habits Controller
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import type { Request, Response } from 'express';

export class HabitsController {
  private readonly habits: Array<{ name: string }> = [];

  store = (req: Request, res: Response): Response => {
    const { name } = req.body;

    const newHabit = { name };

    this.habits.push(newHabit);
    return res.status(201).json(newHabit);
  };
}
