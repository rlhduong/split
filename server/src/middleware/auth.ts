import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { SessionUser } from '../types';
import { UserService } from '../service/user';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  const token = cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as SessionUser;

    const user = await UserService.getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
