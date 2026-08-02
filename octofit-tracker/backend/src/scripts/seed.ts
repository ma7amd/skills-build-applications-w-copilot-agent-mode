import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { UserModel } from '../models/user';
import { TeamModel } from '../models/team';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { WorkoutModel } from '../models/workout';

dotenv.config();

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    { name: 'Avery Kim', email: 'avery.kim@example.com', joinedAt: new Date('2026-01-10'), role: 'captain', team: 'Trail Blazers' },
    { name: 'Jordan Lee', email: 'jordan.lee@example.com', joinedAt: new Date('2026-02-04'), role: 'member', team: 'Trail Blazers' },
    { name: 'Priya Patel', email: 'priya.patel@example.com', joinedAt: new Date('2026-03-11'), role: 'member', team: 'Urban Sprinters' },
  ]);

  const teams = await TeamModel.create([
    { name: 'Trail Blazers', description: 'A high-energy running and hiking crew.', captain: 'Avery Kim', members: users.map((user) => user.name) },
    { name: 'Urban Sprinters', description: 'City-based interval training with a competitive edge.', captain: 'Priya Patel', members: ['Priya Patel'] },
  ]);

  const activities = await ActivityModel.create([
    { user: 'Avery Kim', type: 'run', distance: 8, duration: 52, calories: 630, date: new Date('2026-06-18'), notes: 'Hill repeats and cool-down walk' },
    { user: 'Jordan Lee', type: 'bike', distance: 18, duration: 65, calories: 780, date: new Date('2026-06-20'), notes: 'Morning road loop' },
    { user: 'Priya Patel', type: 'swim', distance: 1.2, duration: 40, calories: 410, date: new Date('2026-06-21'), notes: 'Technique focus with sprints' },
  ]);

  const leaderboard = await LeaderboardModel.create([
    { user: 'Avery Kim', team: 'Trail Blazers', rank: 1, points: 980, lastUpdated: new Date('2026-06-22') },
    { user: 'Jordan Lee', team: 'Trail Blazers', rank: 2, points: 920, lastUpdated: new Date('2026-06-22') },
    { user: 'Priya Patel', team: 'Urban Sprinters', rank: 3, points: 870, lastUpdated: new Date('2026-06-22') },
  ]);

  const workouts = await WorkoutModel.create([
    {
      title: 'Sunrise Strength Circuit',
      description: 'A balanced bodyweight routine for mobility and strength.',
      difficulty: 'Intermediate',
      durationMinutes: 35,
      equipment: ['mat', 'dumbbells'],
      recommendedFor: 'Beginner to intermediate athletes looking to build consistency',
    },
    {
      title: 'City Sprint Intervals',
      description: 'A fast-paced running workout with active recovery.',
      difficulty: 'Advanced',
      durationMinutes: 28,
      equipment: ['running shoes'],
      recommendedFor: 'Runners training for speed and endurance',
    },
  ]);

  console.log('Database seeded:');
  console.log(`- Users: ${users.length}`);
  console.log(`- Teams: ${teams.length}`);
  console.log(`- Activities: ${activities.length}`);
  console.log(`- Leaderboard entries: ${leaderboard.length}`);
  console.log(`- Workouts: ${workouts.length}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
