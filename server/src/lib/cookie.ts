import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
