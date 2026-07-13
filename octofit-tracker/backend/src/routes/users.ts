import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  res.json({ resource: 'users', items: [] });
});

export default usersRouter;
