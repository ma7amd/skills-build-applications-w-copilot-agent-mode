import { Schema, model, Document } from 'mongoose';

export interface UserDoc extends Document {
  name: string;
  email: string;
  joinedAt: Date;
  role: string;
  team: string;
}

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    joinedAt: { type: Date, required: true, default: () => new Date() },
    role: { type: String, required: true, default: 'member' },
    team: { type: String, required: false },
  },
  { timestamps: true },
);

export const UserModel = model<UserDoc>('User', userSchema);
