import { Router } from 'express';
import { login, status, logout, register } from '../controllers/user';
import { validateToken } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', validateToken, logout);
router.get('/status', validateToken, status);
export default router;
