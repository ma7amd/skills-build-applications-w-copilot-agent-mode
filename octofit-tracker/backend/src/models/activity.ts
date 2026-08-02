import { Schema, model, Document } from 'mongoose';

export interface ActivityDoc extends Document {
  user: string;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  date: Date;
  notes: string;
}

const activitySchema = new Schema<ActivityDoc>(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true, default: () => new Date() },
    notes: { type: String, required: false, default: '' },
  },
  { timestamps: true },
);

export const ActivityModel = model<ActivityDoc>('Activity', activitySchema);
