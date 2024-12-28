import { getUser } from '../utils/helper';
import HttpError from 'http-errors';
import { insertUser } from '../db';
import { Request, Response, NextFunction } from 'express';

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  let user = await getUser(username);

  if (user) {
    next(HttpError(400, 'Username already exists'));
    return;
  }

  await insertUser(username, password);
  user = await getUser(username);

  if (user) {
    req.login(user, (err) => {
      if (err) {
        next(HttpError(500, 'Error logging in'));
        return;
      }
      res.send({});
    });
  } else {
    next(HttpError(500, 'Error retrieving user after registration'));
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    next(HttpError(401, 'Unauthorized'));
  }
  res.send({});
};

export const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    next(HttpError(401, 'Unauthorized'));
    return;
  }

  req.logOut((err) => {
    if (err) {
      next(HttpError(500, 'Error logging out'));
      return;
    }
    res.send({});
  });
};
