import { Router } from 'express';
import { sessionValidation } from '../middleware/auth';
import { tripValidation } from '../middleware/trip';
import { getFriends, addFriend } from '../controllers/friends';

const router = Router();

router.get(
  '/trips/:tripId/friends',
  sessionValidation,
  tripValidation,
  getFriends
);

router.post(
  '/trips/:tripId/friends',
  sessionValidation,
  tripValidation,
  addFriend
);

export default router;
