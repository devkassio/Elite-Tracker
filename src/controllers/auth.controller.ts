/**
 * Elite Tracker API - Auth Controller
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import axios from 'axios';
import type { Request, Response } from 'express';

const clientId = 'Ov23liNyNyxBCH6h8VB1';
const clientSecret = 'dacc32d2d6f54762338f1f750a0574a253f11532';

export class AuthController {
  auth = (_req: Request, res: Response) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    res.redirect(redirectUrl);
  };

  authCallback = async (req: Request, res: Response) => {
    // Implementation for handling OAuth callback will go here
    const { code } = req.query;

    const accessTokenUrl = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        // biome-ignore lint/style/useNamingConvention: GitHub API requires snake_case
        client_id: clientId,
        // biome-ignore lint/style/useNamingConvention: GitHub API requires snake_case
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          // biome-ignore lint/style/useNamingConvention: HTTP header requires PascalCase
          Accept: 'application/json',
        },
      }
    );

    const userDataResult = await axios.get('https://api.github.com/user', {
      headers: {
        // biome-ignore lint/style/useNamingConvention: HTTP header requires PascalCase
        Authorization: `Bearer ${accessTokenUrl.data.access_token}`,
      },
    });

    const {
      node_id: nodeId,
      avatar_url: avatarUrl,
      name,
    } = userDataResult.data;

    return res.status(200).json({ nodeId, avatarUrl, name });
  };
}
