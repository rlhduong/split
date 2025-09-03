import { Router } from 'express';
import { validateToken } from '../middleware/auth';
import { validateTrip } from '../middleware/trip';
import {
  createTrip,
  getTrips,
  getTrip,
  deleteTrip,
  addParticipant,
} from '../controllers/trip';

const router = Router();

router.post('/', validateToken, createTrip);
router.get('/:tripId', validateToken, validateTrip, getTrip);
router.get('/', validateToken, getTrips);
router.delete('/:tripId', validateToken, validateTrip, deleteTrip);
router.post(
  '/:tripId/participants',
  validateToken,
  validateTrip,
  addParticipant
);

export default router;
