import { Router, Response, Request } from 'express';
import HttpError from 'http-errors';
const router = Router();

const trips = [
  { id: 1, name: 'trip 1' },
  { id: 2, name: 'trip 2' },
  { id: 3, name: 'trip 3' },
];

router.get('/trips', (req: Request, res: Response) => {
  if (!req.user) {
    throw HttpError(401, 'Unauthorized');
  }

  console.log(req.session);
  res.send(trips);
});

export default router;
