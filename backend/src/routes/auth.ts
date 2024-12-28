import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { registerValidationSchema } from '../utils/validationSchema';
import { registerValidation, sessionValidation } from '../middleware/auth';
import { handleRegister, handleLogin, handleLogout } from '../controllers/auth';
import '../strategies/local-strategy';
import passport from 'passport';

const router = Router();

router.post('/admin/auth/login', passport.authenticate('local'), handleLogin);

router.post(
  '/admin/auth/register',
  checkSchema(registerValidationSchema),
  registerValidation,
  handleRegister
);

router.post('/admin/auth/logout', sessionValidation, handleLogout);

export default router;
