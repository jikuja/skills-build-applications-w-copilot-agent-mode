import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (_req, res) => {
  res.json({ resource: 'leaderboard', items: [] });
});

export default leaderboardRouter;
