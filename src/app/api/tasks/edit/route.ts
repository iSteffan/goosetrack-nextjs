import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';

import Task from '@/models/Task';

import { authMiddleware } from '@/middleware/auth';

export async function PATCH(req: NextRequest) {
  const user = authMiddleware(req);

  // Перевіряємо, чи user є об’єктом JwtPayload, а не string
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const data = await req.json();
    const { id, updates } = data;

    if (!id || !updates) {
      return NextResponse.json(
        { message: 'Task ID and updates are required' },
        { status: 400 },
      );
    }

    const task = await Task.findById(id);
    if (!task || task.userId !== user.id) {
      return NextResponse.json(
        { message: 'Task not found or unauthorized' },
        { status: 404 },
      );
    }

    Object.assign(task, updates);
    await task.save();

    return NextResponse.json(
      { message: 'Task updated successfully', task },
      { status: 200 },
    );
  } catch (error) {
    console.error('Failed to update task:', error);
    return NextResponse.json(
      { message: 'Failed to update task' },
      { status: 500 },
    );
  }
}
