import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';

import { dbConnect } from '@/utils/dbConnect';
import { authMiddleware } from '@/middleware/auth';

import Review from '@/models/Review';

export async function DELETE(req: NextRequest) {
  const user = authMiddleware(req);

  // Перевіряємо, чи user є об’єктом JwtPayload, а не string
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    // Отримуємо userId з JwtPayload
    const userId = (user as JwtPayload).id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token data' },
        { status: 400 },
      );
    }

    const deletedReview = await Review.findOneAndDelete({ userId });

    if (!deletedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete review:', error);

    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 },
    );
  }
}
