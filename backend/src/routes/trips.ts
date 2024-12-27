import { Router, Response, Request } from 'express';

const router = Router();

const trips = [
  { id: 1, name: 'trip 1' },
  { id: 2, name: 'trip 2' },
  { id: 3, name: 'trip 3' },
];

router.get('/trips', (req: Request, res: Response) => {
  res.send({ trips });
});

export default router;
