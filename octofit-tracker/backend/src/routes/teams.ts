import { Router } from 'express';

const teamsRouter = Router();

teamsRouter.get('/', (_req, res) => {
  res.json({ resource: 'teams', items: [] });
});

export default teamsRouter;
