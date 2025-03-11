import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  userId: string;
  username: string;
  avatarURL: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatarURL: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Review ||
  mongoose.model<IReview>('Review', ReviewSchema);
