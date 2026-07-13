import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_PORT = Number(process.env.MONGO_PORT) || 27017;
const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:${MONGO_PORT}/octofit_db`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
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
