import { Router } from 'express';

const workoutsRouter = Router();

workoutsRouter.get('/', (_req, res) => {
  res.json({ resource: 'workouts', items: [] });
});

export default workoutsRouter;
