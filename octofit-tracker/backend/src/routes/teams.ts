import { Router } from 'express';
import Team from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const items = await Team.find()
      .populate('members', 'fullName email fitnessLevel')
      .sort({ createdAt: -1 })
      .lean();
    res.json({ resource: 'teams', items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
