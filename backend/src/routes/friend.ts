import { Router } from 'express';
import { sessionValidation } from '../middleware/auth';
import { tripValidation } from '../middleware/trip';
import { getFriends } from '../controllers/friends';

const router = Router();

router.get('/trips/:tripId/friends', sessionValidation, tripValidation, getFriends);
router.post('/trips/:tripId/friends', sessionValidation, tripValidation);
router.delete('/trips/:tripId/friends', sessionValidation, tripValidation);

export default router;