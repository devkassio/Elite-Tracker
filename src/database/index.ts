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

    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI não está definida no arquivo .env');
    }

    console.log('Connecting to MongoDB... 😬');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('MongoDB connected successfully 😎✨');
  } catch (error) {
    throw new Error(`❌ Error connecting to MongoDB: ${error}`);
  }
}
