import { Router, Response, Request, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { registerValidationSchema } from '../utils/validationSchema';
import { registerValidation } from '../middleware/auth';
import { handleRegister, handleLogin, clear } from '../controllers/auth';
import { nextTick } from 'process';

const router = Router();

router.post(
  '/admin/auth/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const response = await handleLogin(username, password);
      res.send(response);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  '/admin/auth/register',
  checkSchema(registerValidationSchema),
  registerValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const response = await handleRegister(username, password);
      res.send(response);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post('/admin/auth/logout', (req: Request, res: Response) => {
  res.send({ message: 'User logged out' });
});

router.delete('/clear', (req: Request, res: Response) => {
  res.send(clear());
});

export default router;
