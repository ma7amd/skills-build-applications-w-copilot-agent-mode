import mongoose from 'mongoose';

const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectDatabase() {
  return mongoose.connect(mongoUrl, {
    dbName: 'octofit_db',
    serverSelectionTimeoutMS: 5000,
  });
}

export function getDatabaseUrl() {
  return mongoUrl;
}
