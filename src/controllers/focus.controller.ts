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
import { z } from 'zod';
import { focusTimeModel } from '../schemas/focus-times-model.js';
import { buildValidationErrorMessage } from '../utils/build-validation-error-message.util.js';

export class FocusTimeController {
  store = async (req: Request, res: Response) => {
    const Schema = z.object({
      timeFrom: z.coerce.date(),
      timeTo: z.coerce.date(),
    });

    const validation = Schema.safeParse(req.body);

    if (!validation.success) {
      const errors = buildValidationErrorMessage(validation.error.issues);
      return res.status(422).json({ message: errors });
    }
    const timeFrom = dayjs(validation.data.timeFrom);
    const timeTo = dayjs(validation.data.timeTo);

    const isTimeToBeforeTimeFrom = timeTo.isBefore(timeFrom);

    if (isTimeToBeforeTimeFrom) {
      return res
        .status(422)
        .json({ message: '"timeTo" cannot be before "timeFrom".' });
    }

    const newFocusTime = await focusTimeModel.create({
      timeFrom: timeFrom.toDate(),
      timeTo: [timeTo.toDate()],
    });

    return res.status(201).json(newFocusTime);
  };

  metricsByMonth = async (req: Request, res: Response) => {
    const Schema = z.object({
      date: z.coerce.date(),
    });

    const validation = Schema.safeParse(req.query);

    if (!validation.success) {
      const errors = buildValidationErrorMessage(validation.error.issues);
      return res.status(422).json({ message: errors });
    }

    const startDate = dayjs(validation.data.date).startOf('month');
    const endDate = dayjs(validation.data.date).endOf('month');

    const metricsFocusTime = await focusTimeModel
      .aggregate()
      .match({
        timeFrom: {
          $gte: startDate.toDate(),
          $lte: endDate.toDate(),
        },
      })
      .project({
        year: {
          $year: '$timeFrom',
        },
        month: {
          $month: '$timeFrom',
        },
        day: {
          $dayOfMonth: '$timeFrom',
        },
      })
      .group({
        _id: ['$year', '$month', '$day'],
        count: { $sum: 1 },
      })
      .sort({ _id: 1 });

    return res.status(200).json(metricsFocusTime);
  };
}
