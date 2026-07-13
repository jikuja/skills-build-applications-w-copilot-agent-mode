import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        fullName: 'Avery Coleman',
        email: 'avery.coleman@octofit.local',
        age: 28,
        fitnessLevel: 'advanced',
        goals: ['Half marathon', 'Improve VO2 max']
      },
      {
        fullName: 'Jordan Patel',
        email: 'jordan.patel@octofit.local',
        age: 34,
        fitnessLevel: 'intermediate',
        goals: ['Lose 5kg', 'Complete 10k run']
      },
      {
        fullName: 'Riley Chen',
        email: 'riley.chen@octofit.local',
        age: 24,
        fitnessLevel: 'beginner',
        goals: ['Build consistency', 'Increase strength']
      },
      {
        fullName: 'Morgan Diaz',
        email: 'morgan.diaz@octofit.local',
        age: 31,
        fitnessLevel: 'intermediate',
        goals: ['Improve mobility', 'Train for cycling event']
      }
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Downtown Dashers',
        city: 'Seattle',
        coachName: 'Coach Elena Brooks',
        members: [users[0]._id, users[1]._id]
      },
      {
        name: 'Sunrise Striders',
        city: 'Portland',
        coachName: 'Coach Marcus Green',
        members: [users[2]._id, users[3]._id]
      }
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[1]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[2]._id }, { team: teams[1]._id }),
      User.updateOne({ _id: users[3]._id }, { team: teams[1]._id })
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        activityType: 'Tempo Run',
        durationMinutes: 52,
        caloriesBurned: 640,
        distanceKm: 10.4,
        completedAt: new Date('2026-07-10T06:30:00.000Z')
      },
      {
        user: users[1]._id,
        activityType: 'Strength Circuit',
        durationMinutes: 45,
        caloriesBurned: 410,
        distanceKm: 0,
        completedAt: new Date('2026-07-11T18:15:00.000Z')
      },
      {
        user: users[2]._id,
        activityType: 'Brisk Walk',
        durationMinutes: 38,
        caloriesBurned: 220,
        distanceKm: 3.6,
        completedAt: new Date('2026-07-12T07:05:00.000Z')
      },
      {
        user: users[3]._id,
        activityType: 'Cycling Intervals',
        durationMinutes: 60,
        caloriesBurned: 700,
        distanceKm: 22.3,
        completedAt: new Date('2026-07-12T16:40:00.000Z')
      }
    ]);

    await Workout.insertMany([
      {
        title: 'Starter Full Body',
        category: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 35,
        equipment: ['Dumbbells', 'Mat'],
        targetMuscles: ['Legs', 'Back', 'Core']
      },
      {
        title: 'Threshold Builder',
        category: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 50,
        equipment: ['Running shoes'],
        targetMuscles: ['Legs', 'Core']
      },
      {
        title: 'Power Endurance Ride',
        category: 'Cycling',
        difficulty: 'advanced',
        durationMinutes: 65,
        equipment: ['Stationary bike'],
        targetMuscles: ['Legs', 'Glutes']
      }
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 1240, rank: 1, streakDays: 19 },
      { user: users[3]._id, points: 1130, rank: 2, streakDays: 14 },
      { user: users[1]._id, points: 980, rank: 3, streakDays: 11 },
      { user: users[2]._id, points: 760, rank: 4, streakDays: 7 }
    ]);

    console.log('Users, teams, activities, leaderboard, and workouts seeded');

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
