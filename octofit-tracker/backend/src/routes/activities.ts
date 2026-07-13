import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter.get('/', (_req, res) => {
  res.json({ resource: 'activities', items: [] });
});

export default activitiesRouter;
