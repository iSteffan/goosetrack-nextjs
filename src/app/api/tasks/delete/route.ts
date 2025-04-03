import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';

import Task from '@/models/Task';

import { authMiddleware } from '@/middleware/auth';

export async function DELETE(req: NextRequest) {
  const user = authMiddleware(req);

  // Перевіряємо, чи user є об’єктом JwtPayload, а не string
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await dbConnect();

    // Перетворюємо req.url на об'єкт URL
    const url = new URL(req.url);
    const id = url.searchParams.get('id'); // Отримуємо ID задачі з query-параметра

    if (!id) {
      return NextResponse.json(
        { message: 'Task ID is required' },
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

    await task.remove();

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Failed to delete task:', error);
    return NextResponse.json(
      { message: 'Failed to delete task' },
      { status: 500 },
    );
  }
}
