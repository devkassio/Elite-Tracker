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
import { buildValidationErrorMessage } from '../utils/build-validation-error-message.util.js';

export class HabitsController {
  store = async (req: Request, res: Response): Promise<Response> => {
    const Schema = z.object({
      name: z.string().min(2).max(70),
    });

    const habit = Schema.safeParse(req.body);

    if (!habit.success) {
      const errors = buildValidationErrorMessage(habit.error.issues);
      return res.status(422).json({ message: errors });
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

  index = async (_req: Request, res: Response): Promise<Response> => {
    const habits = await habitModel.find().sort({ name: 1 });
    return res.status(200).json(habits);
  };

  delete = async (req: Request, res: Response) => {
    const Schema = z.object({
      id: z.string(),
    });

    const validation = Schema.safeParse(req.params);

    if (!validation.success) {
      const errors = buildValidationErrorMessage(validation.error.issues);
      return res.status(422).json({ message: errors });
    }

    await habitModel.deleteOne({
      _id: validation.data.id,
    });

    return res.status(204).json({ message: 'Habit deleted successfully.' });
  };
}
