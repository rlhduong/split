import { Router } from 'express';
import { sessionValidation } from '../middleware/auth';
import { tripValidation } from '../middleware/trip';
import { addExpense } from '../controllers/expense';

const router = Router();

router.post(
  '/trips/:tripId/expense',
  sessionValidation,
  tripValidation,
  addExpense
);

export default router;
