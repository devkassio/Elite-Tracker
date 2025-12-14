/**
 * Elite Tracker API - Auth Middleware
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  nodeId: string;
  iat?: number;
  exp?: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined {
  const jwtSecret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authorization header is required',
    });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid authorization format. Use: Bearer <token>',
    });
  }

  if (!jwtSecret) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'JWT configuration is missing',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    // @ts-expect-error - Extending Express Request type with user property
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token expired',
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid token',
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Token verification failed',
    });
  }
}
