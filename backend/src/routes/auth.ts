import { Router, Response, Request } from 'express';
import { checkSchema } from 'express-validator';
import { registerValidationSchema } from '../utils/validationSchema';
import { registerValidation } from '../middleware/auth';
import { handleRegister, clear } from '../controllers/auth';

const router = Router();

router.post('/admin/auth/login', (req: Request, res: Response) => {
  res.send({ message: 'User logged in' });
});

router.post(
  '/admin/auth/register',
  checkSchema(registerValidationSchema),
  registerValidation,
  (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.send(handleRegister(username, password));
  }
);

router.post('/admin/auth/logout', (req: Request, res: Response) => {
  res.send({ message: 'User logged out' });
});

router.delete('/clear', (req: Request, res: Response) => {
  res.send(clear());
});

export default router;
