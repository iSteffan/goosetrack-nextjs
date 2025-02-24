import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI не вказано у файлі .env');
}

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Підключено до MongoDB');
};

export default dbConnect;
