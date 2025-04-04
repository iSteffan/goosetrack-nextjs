import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  start: string;
  end: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [250, 'Title must not exceed 250 characters'],
    },
    start: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^\d{2}:\d{2}$/, 'Invalid start time format (HH:mm)'],
    },
    end: {
      type: String,
      required: [true, 'End time is required'],
      match: [/^\d{2}:\d{2}$/, 'Invalid end time format (HH:mm)'],
      validate: {
        validator: function (value: string) {
          return value > this.start;
        },
        message: 'End time must be after start time',
      },
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: ['Low', 'Medium', 'High'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['To Do', 'In Progress', 'Done'],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Task ||
  mongoose.model<ITask>('Task', TaskSchema);
