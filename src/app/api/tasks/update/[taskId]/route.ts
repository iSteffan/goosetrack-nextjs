import { NextRequest, NextResponse } from 'next/server';

import { dbConnect } from '@/utils/dbConnect';
import { authMiddleware } from '@/middleware/auth';

import Task from '@/models/Task';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const user = authMiddleware(req);

  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const updates = await req.json();
    const { taskId } = await params;

    const task = await Task.findById(taskId);
    if (!task || task.userId !== user.id) {
      return NextResponse.json(
        { message: 'Not found or unauthorized' },
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
