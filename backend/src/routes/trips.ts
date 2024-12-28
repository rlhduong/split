import { Router } from 'express';
import { sessionValidation } from '../middleware/auth';
import { tripValidation } from '../middleware/trip';
import { getTrips, createTrip, deleteTrip } from '../controllers/trips';

const router = Router();

router.post('/trips', sessionValidation, createTrip);
router.get('/trips', sessionValidation, getTrips);
router.delete('/trips', sessionValidation, tripValidation, deleteTrip);

export default router;
