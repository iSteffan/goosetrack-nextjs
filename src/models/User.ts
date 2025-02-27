import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatarURL: string;
  birthday: string;
  phone: string;
  telegram: string;
  verificationToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    avatarURL: {
      type: String,
      default: '',
    },
    birthday: { type: String, default: '' },
    phone: { type: String, default: '' },
    telegram: { type: String, default: '' },
    verificationToken: { type: String, default: '' },
  },
  { timestamps: true }, // Автоматично додає createdAt і updatedAt
);

// Уникаємо помилок при HMR у Next.js
export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
