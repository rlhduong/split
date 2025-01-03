import { Router } from 'express';
import { sessionValidation } from '../middleware/auth';
import { tripValidation } from '../middleware/trip';
import { addExpense, viewEpenses, settle } from '../controllers/expense';

const router = Router();

router.post(
  '/trips/:tripId/expenses',
  sessionValidation,
  tripValidation,
  addExpense
);

router.get(
  '/trips/:tripId/expenses',
  sessionValidation,
  tripValidation,
  viewEpenses
);

router.get(
  '/trips/:tripId/expenses/settle',
  sessionValidation,
  tripValidation,
  settle
);

export default router;
