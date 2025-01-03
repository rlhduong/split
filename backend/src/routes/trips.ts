import { Router } from 'express';
import { sessionValidation } from '../middleware/auth';
import { tripValidation } from '../middleware/trip';
import {
  getTrips,
  createTrip,
  deleteTrip,
  updateTripA as updateTrip,
  viewTrip,
  addFriend,
} from '../controllers/trips';

const router = Router();

router.post('/trips', sessionValidation, createTrip);
router.get('/trips', sessionValidation, getTrips);

router.get('/trips/:tripId', sessionValidation, tripValidation, viewTrip);
router.delete('/trips/:tripId', sessionValidation, tripValidation, deleteTrip);
router.put('/trips/:tripId', sessionValidation, tripValidation, updateTrip);

router.post(
  '/trips/:tripId/friends',
  sessionValidation,
  tripValidation,
  addFriend
);

export default router;
