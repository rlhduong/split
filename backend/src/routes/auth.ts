import { Router, Response, Request, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import { registerValidationSchema } from '../utils/validationSchema';
import { registerValidation } from '../middleware/auth';
import { handleRegister, handleLogin } from '../controllers/auth';

const router = Router();

router.post('/admin/auth/login', handleLogin);

router.post(
  '/admin/auth/register',
  checkSchema(registerValidationSchema),
  registerValidation,
  handleRegister
);

router.post('/admin/auth/logout', (req: Request, res: Response) => {
  res.send({ message: 'User logged out' });
});

export default router;
