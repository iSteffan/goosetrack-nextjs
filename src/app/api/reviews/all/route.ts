import { dbConnect } from '@/utils/dbConnect';
import Review from '@/models/Review';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const reviews = await Review.find();

    const userIds = reviews.map(r => r.userId);

    const users = await User.find({ _id: { $in: userIds } }).select(
      'avatarURL _id',
    );

    const avatarMap = new Map(users.map(u => [u._id.toString(), u.avatarURL]));

    const enrichedReviews = reviews.map(r => ({
      _id: r._id,
      userId: r.userId,
      username: r.username,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      avatarURL: avatarMap.get(r.userId) || '',
    }));

    return NextResponse.json(enrichedReviews, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch all reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch all reviews' },
      { status: 500 },
    );
  }
}
