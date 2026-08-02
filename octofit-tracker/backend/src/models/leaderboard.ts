import { Schema, model, Document } from 'mongoose';

export interface LeaderboardDoc extends Document {
  user: string;
  team: string;
  rank: number;
  points: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<LeaderboardDoc>(
  {
    user: { type: String, required: true },
    team: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    lastUpdated: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true },
);

export const LeaderboardModel = model<LeaderboardDoc>('Leaderboard', leaderboardSchema);
