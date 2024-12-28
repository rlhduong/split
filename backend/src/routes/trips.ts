import { Router} from 'express';
import { sessionValidation } from '../middleware/auth';
import { getTrips, createTrip } from '../controllers/trips';

const router = Router();


router.post('/trips', sessionValidation, createTrip);
router.get('/trips', sessionValidation, getTrips);

export default router;
