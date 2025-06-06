import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';

import { dbConnect } from '@/utils/dbConnect';
import { authMiddleware } from '@/middleware/auth';

import Task from '@/models/Task';

export async function GET(req: NextRequest) {
  const user = authMiddleware(req);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const tasks = await Task.find({ userId: (user as JwtPayload).id });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch tasks:', error);

    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 },
    );
  }
}
