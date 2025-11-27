/**
 * Elite Tracker API - Auth Controller
 *
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 *
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import axios, { isAxiosError } from 'axios';
import type { Request, Response } from 'express';

const clientId = 'Ov23liNyNyxBCH6h8VB1';
const clientSecret = 'dacc32d2d6f54762338f1f750a0574a253f11532';

export class AuthController {
  auth = (_req: Request, res: Response) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    res.redirect(redirectUrl);
  };

  authCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Authorization code is required',
        });
      }

      const accessTokenResponse = await axios.post(
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

      const { access_token: accessToken } = accessTokenResponse.data;

      if (!accessToken) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Failed to obtain access token',
        });
      }

      const userDataResult = await axios.get('https://api.github.com/user', {
        headers: {
          // biome-ignore lint/style/useNamingConvention: HTTP header requires PascalCase
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const {
        node_id: nodeId,
        avatar_url: avatarUrl,
        name,
      } = userDataResult.data;

      return res.status(200).json({ nodeId, avatarUrl, name });
    } catch (error) {
      console.log('OAuth callback error:', error);

      if (isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message =
          status >= 500
            ? 'GitHub service temporarily unavailable'
            : 'Authentication failed';

        return res.status(status).json({
          error: error.response?.statusText || 'Internal Server Error',
          message,
        });
      }

      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
      });
    }
  };
}
