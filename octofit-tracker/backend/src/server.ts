import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { UserModel } from './models/user';
import { TeamModel } from './models/team';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { WorkoutModel } from './models/workout';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl, port, codespaceName: codespaceName || null });
});

app.get('/api/users', async (_req, res) => {
  const users = await UserModel.find().lean();
  res.json({ users });
});

app.get('/api/teams', async (_req, res) => {
  const teams = await TeamModel.find().lean();
  res.json({ teams });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await ActivityModel.find().lean();
  res.json({ activities });
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await WorkoutModel.find().lean();
  res.json({ workouts });
});

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
