import { Response, Request } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserService } from '../service/user';

//Config
dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await UserService.register(email, password);
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error: any) {
    if (error.message === 'User already exists') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.login(email, password);
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error: any) {
    if (error.message === 'Invalid email or password') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: 'User logged out successfully' });
};

export const status = async (req: Request, res: Response) => {
  res.status(200).json({ userId: req.user?.userId });
};
