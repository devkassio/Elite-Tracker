/**
 * Elite Tracker API - Auth Controller
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import type { Request, Response } from 'express';

const clientId = 'Ov23liNyNyxBCH6h8VB1';
const clientSecret = 'dacc32d2d6f54762338f1f750a0574a253f11532';

export class AuthController {
  auth = (_req: Request, res: Response) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    res.redirect(redirectUrl);
  };

  authCallback = (req: Request, res: Response) => {
    // Implementation for handling OAuth callback will go here
    console.log(req.query);

    return res.send();
  };
}

// clientSecret will be used in future OAuth callback implementation
console.log('OAuth configured with client:', clientId, clientSecret);
