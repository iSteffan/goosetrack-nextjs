import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { dbConnect } from '@/utils/dbConnect';

import User from '@/models/User';

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    // console.log('Token from cookies:', token);

    if (!token) {
      return NextResponse.json(
        { message: 'Token not provided' },
        { status: 401 },
      );
    }

    // Перевірка токена
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      //   console.log('Decoded Token:', decoded);
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Отримання даних користувача з бази
    const user = await User.findById(decoded.id);
    // console.log('User:', user);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Повернення інформації про користувача
    return NextResponse.json(
      {
        message: 'User retrieved successfully',
        user: {
          name: user.name,
          email: user.email,
          avatarURL: user.avatarURL,
          birthday: user.birthday,
          phone: user.phone,
          telegram: user.telegram,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
