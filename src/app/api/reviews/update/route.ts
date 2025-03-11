import { NextRequest, NextResponse } from 'next/server';

import { dbConnect } from '@/utils/dbConnect';
import Review from '@/models/Review';
import { authMiddleware } from '@/middleware/auth';
import { JwtPayload } from 'jsonwebtoken';

export async function PATCH(req: NextRequest) {
  const user = authMiddleware(req);

  // Перевіряємо, чи user є об’єктом JwtPayload, а не string
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rating, comment } = await req.json();
    await dbConnect();

    // Отримуємо userId з JwtPayload
    const userId = (user as JwtPayload).id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid token data' },
        { status: 400 },
      );
    }

    const updatedReview = await Review.findOneAndUpdate(
      { userId },
      { rating, comment },
      { new: true },
    );

    if (!updatedReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error('Failed to update review:', error);

    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 },
    );
  }
}
