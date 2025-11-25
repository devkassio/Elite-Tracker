/**
 * Elite Tracker API - Database Configuration
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

// Database configuration will be added here

import mongoose from 'mongoose';

export async function setupMongo() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    console.log('Connecting to MongoDB... 😬');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully 😎✨');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
