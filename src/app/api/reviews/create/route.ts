import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';

import { authMiddleware } from '@/middleware/auth';

import { dbConnect } from '@/utils/dbConnect';

import Review from '@/models/Review';

export async function POST(req: NextRequest) {
  const user = authMiddleware(req);

  // Перевіряємо, чи user не є просто рядком, а є об’єктом JwtPayload
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rating, comment } = await req.json();
    if (!rating || !comment) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    // Отримуємо `id` та `username`, гарантуючи, що `user` — це `JwtPayload`
    const userId = (user as JwtPayload).id;
    const username = (user as JwtPayload).name;

    if (!userId || !username) {
      return NextResponse.json(
        { error: 'Invalid token data' },
        { status: 400 },
      );
    }

    const existingReview = await Review.findOne({ userId });
    if (existingReview) {
      return NextResponse.json(
        { error: 'Review already exists' },
        { status: 400 },
      );
    }

    const newReview = await Review.create({
      userId,
      username,
      rating,
      comment,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);

    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 },
    );
  }
}
