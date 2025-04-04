import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';

import Task from '@/models/Task';

import { authMiddleware } from '@/middleware/auth';

export async function POST(req: NextRequest) {
  const user = authMiddleware(req);

  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await dbConnect();

    const data = await req.json();
    const { title, start, end, priority, date, category } = data;

    if (!title || !start || !end || !priority || !date || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newTask = new Task({
      title,
      start,
      end,
      priority,
      date,
      category,
      userId: user.id,
    });
    await newTask.save();

    return NextResponse.json(
      { message: 'Task created successfully', task: newTask },
      { status: 201 },
    );
  } catch (error) {
    console.error('Failed to create task:', error);
    return NextResponse.json(
      { message: 'Failed to create task' },
      { status: 500 },
    );
  }
}
