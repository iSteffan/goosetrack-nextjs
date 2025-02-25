import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'goosetrack',
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};
