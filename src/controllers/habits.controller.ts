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
import { z } from 'zod';
import { habitModel } from '../schemas/habit.model.js';

export class HabitsController {
  store = async (req: Request, res: Response): Promise<Response> => {
    const Schema = z.object({
      name: z.string().min(2).max(70),
    });

    const { name } = req.body;
    const habit = Schema.safeParse({ name });

    if (!habit.success) {
      return res.status(400).json({ message: 'Invalid habit name.' });
    }

    const findHabit = await habitModel.findOne({ name: habit.data.name });

    if (findHabit) {
      return res.status(400).json({ message: 'Habit already exists.' });
    }

    const newHabit = await habitModel.create({
      name: habit.data.name,
      isCompleted: [],
    });

    return res.status(201).json(newHabit);
  };
}
