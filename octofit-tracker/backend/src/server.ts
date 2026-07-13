import express from 'express';
import mongoose from 'mongoose';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_PORT = Number(process.env.MONGO_PORT) || 27017;
const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:${MONGO_PORT}/octofit_db`;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ baseUrl });
});

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    // Keep server startup explicit so failures are visible during initialization.
    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
