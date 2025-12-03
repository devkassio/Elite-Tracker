/**
 * Elite Tracker API - Habit Model
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

// biome-ignore assist/source/organizeImports: imports are organized by Biome
import { Schema, model } from 'mongoose';

const habitSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: [Date],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const habitModel = model('Habit', habitSchema);
