/**
 * Elite Tracker API - Habits Controller
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import dayjs from 'dayjs';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
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

    const findHabit = await habitModel.findById(validation.data.id);

    if (!findHabit) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    await habitModel.deleteOne({
      _id: validation.data.id,
    });

    return res.status(204).json({ message: 'Habit deleted successfully.' });
  };

  toggle = async (req: Request, res: Response) => {
    const Schema = z.object({
      id: z.string(),
    });

    const validation = Schema.safeParse(req.params);

    if (!validation.success) {
      const errors = buildValidationErrorMessage(validation.error.issues);
      return res.status(422).json({ message: errors });
    }

    const findHabit = await habitModel.findOne({ _id: validation.data.id });

    if (!findHabit) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    const today = dayjs().startOf('day').toISOString();

    const isHabitCompletedOnDate = findHabit
      .toObject()
      ?.isCompleted.find((date) => dayjs(String(date)).toISOString() === today);

    if (isHabitCompletedOnDate) {
      // Remove today's date from isCompleted
      const updatedDates = await habitModel.findOneAndUpdate(
        { _id: validation.data.id },
        { $pull: { isCompleted: today } },
        { returnDocument: 'after' }
      );
      return res.status(200).json(updatedDates);
    }

    // Add today's date to isCompleted
    const updatedHabit = await habitModel.findOneAndUpdate(
      { _id: validation.data.id },
      { $push: { isCompleted: today } },
      { returnDocument: 'after' }
    );

    return res.status(200).json(updatedHabit);
  };

  metrics = async (req: Request, res: Response) => {
    const Schema = z.object({
      id: z.string(),
      date: z.coerce.date(),
    });

    const validation = Schema.safeParse({ ...req.params, ...req.query });

    if (!validation.success) {
      const errors = buildValidationErrorMessage(validation.error.issues);
      return res.status(422).json({ message: errors });
    }

    const dateFrom = dayjs(validation.data.date).startOf('month');
    const dateTo = dayjs(validation.data.date).endOf('month');

    const [habitMetrics] = await habitModel
      .aggregate()
      .match({
        _id: new mongoose.Types.ObjectId(validation.data.id),
      })
      .project({
        _id: 1,
        name: 1,
        isCompleted: {
          $filter: {
            input: '$isCompleted',
            as: 'iscomplete',
            cond: {
              $and: [
                {
                  $gte: ['$$iscomplete', dateFrom.toDate()],
                },
                {
                  $lte: ['$$iscomplete', dateTo.toDate()],
                },
              ],
            },
          },
        },
      });

    if (!habitMetrics) {
      return res.status(404).json({ message: 'Habit not found.' });
    }

    return res.status(200).json(habitMetrics);
  };
}
