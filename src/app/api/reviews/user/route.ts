import { dbConnect } from '@/utils/dbConnect';
import Review from '@/models/Review';
import { authMiddleware } from '@/middleware/auth';

import { NextResponse, NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const user = authMiddleware(req);
  if (!user || typeof user === 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const review = await Review.findOne({ userId: (user as JwtPayload).id });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch review:', error);

    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 },
    );
  }
}
