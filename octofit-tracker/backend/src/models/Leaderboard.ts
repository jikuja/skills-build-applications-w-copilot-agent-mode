import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
