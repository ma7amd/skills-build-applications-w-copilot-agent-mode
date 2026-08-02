import { Schema, model, Document } from 'mongoose';

export interface WorkoutDoc extends Document {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  equipment: string[];
  recommendedFor: string;
}

const workoutSchema = new Schema<WorkoutDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    equipment: { type: [String], required: true, default: [] },
    recommendedFor: { type: String, required: true },
  },
  { timestamps: true },
);

export const WorkoutModel = model<WorkoutDoc>('Workout', workoutSchema);
