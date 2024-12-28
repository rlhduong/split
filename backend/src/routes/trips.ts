import { Router, Response, Request } from 'express';
const router = Router();

const trips = [
  { id: 1, name: 'trip 1' },
  { id: 2, name: 'trip 2' },
  { id: 3, name: 'trip 3' },
];

router.get('/trips', (req: Request, res: Response) => {
  req.sessionStore.get(req.session.id, (err, session) => {
    if (err) {
      res.send({ message: 'An error occurred' });
      return;
    }

    if (session && session.visited) {
      console.log(session);
      res.send({ trips });
      return;
    }
  });
});

export default router;
