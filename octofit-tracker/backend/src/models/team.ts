import { Schema, model, Document } from 'mongoose';

export interface TeamDoc extends Document {
  name: string;
  description: string;
  captain: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDoc>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    captain: { type: String, required: true },
    members: { type: [String], required: true, default: [] },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true },
);

export const TeamModel = model<TeamDoc>('Team', teamSchema);
