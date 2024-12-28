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
  const user = await getUser(username);

  if (user) {
    next(HttpError(400, 'Username already exists'));
    return;
  }

  insertUser(username, password);
  req.session.visited = true;
  res.send({ message: 'User registered' });
};

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (!user || user.password !== password) {
    next(HttpError(401, 'Invalid username or password'));
    return;
  }

  req.session.visited = true;
  res.send({ message: 'User logged in' });
}