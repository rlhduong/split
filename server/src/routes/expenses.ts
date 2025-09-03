import { Router } from 'express';
import { validateToken } from '../middleware/auth';
import { validateTrip } from '../middleware/trip';
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
  settle,
} from '../controllers/expenses';

const router = Router({ mergeParams: true });

router.post('/', validateToken, validateTrip, addExpense);
router.get('/', validateToken, validateTrip, getAllExpenses);
router.delete('/:expenseId', validateToken, validateTrip, deleteExpense);
router.get('/settle', validateToken, validateTrip, settle);

export default router;
