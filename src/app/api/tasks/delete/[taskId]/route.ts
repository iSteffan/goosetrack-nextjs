// import { NextRequest, NextResponse } from 'next/server';
// import { dbConnect } from '@/utils/dbConnect';
// import Task from '@/models/Task';
// import { authMiddleware } from '@/middleware/auth';

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { taskId: string } },
// ) {
//   const user = authMiddleware(req);

//   if (!user || typeof user === 'string') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     await dbConnect();

//     const { taskId } = params;

//     if (!taskId) {
//       return NextResponse.json(
//         { message: 'Task ID is required' },
//         { status: 400 },
//       );
//     }

//     const task = await Task.findById(taskId);

//     if (!task || task.userId !== user.id) {
//       return NextResponse.json(
//         { message: 'Task not found or unauthorized' },
//         { status: 404 },
//       );
//     }

//     await Task.findByIdAndDelete(taskId);

//     return NextResponse.json(
//       { message: 'Task deleted successfully' },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Failed to delete task:', error);
//     return NextResponse.json(
//       { message: 'Failed to delete task' },
//       { status: 500 },
//     );
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { dbConnect } from '@/utils/dbConnect';
// import Task from '@/models/Task';
// import { authMiddleware } from '@/middleware/auth';

// type Context = {
//   params: {
//     taskId: string;
//   };
// };

// export async function DELETE(req: NextRequest, context: Context) {
//   const user = authMiddleware(req);

//   if (!user || typeof user === 'string') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     await dbConnect();

//     const { taskId } = context.params;

//     if (!taskId) {
//       return NextResponse.json(
//         { message: 'Task ID is required' },
//         { status: 400 },
//       );
//     }

//     const task = await Task.findById(taskId);

//     if (!task || task.userId !== user.id) {
//       return NextResponse.json(
//         { message: 'Task not found or unauthorized' },
//         { status: 404 },
//       );
//     }

//     await Task.findByIdAndDelete(taskId);

//     return NextResponse.json(
//       { message: 'Task deleted successfully' },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Failed to delete task:', error);
//     return NextResponse.json(
//       { message: 'Failed to delete task' },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/utils/dbConnect';
import Task from '@/models/Task';
import { authMiddleware } from '@/middleware/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const user = authMiddleware(req);

  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const { taskId } = await params;

    if (!taskId) {
      return NextResponse.json(
        { message: 'Task ID is required' },
        { status: 400 },
      );
    }

    const task = await Task.findById(taskId);

    if (!task || task.userId !== user.id) {
      return NextResponse.json(
        { message: 'Task not found or unauthorized' },
        { status: 404 },
      );
    }

    await Task.findByIdAndDelete(taskId);

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
