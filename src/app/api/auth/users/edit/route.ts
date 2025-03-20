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

type UserUpdates = {
  name?: string;
  email?: string;
  avatarURL?: string;
  birthday?: string;
  phone?: string;
  telegram?: string;
};

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const updates: UserUpdates = {};

    const avatarURL = formData.get('avatarURL');
    if (avatarURL && typeof avatarURL === 'string') {
      updates.avatarURL = avatarURL;
    } else {
      console.error('Invalid or missing avatarURL in formData.');
    }

    ['name', 'email', 'birthday', 'phone', 'telegram'].forEach(key => {
      const value = formData.get(key);
      if (value) {
        updates[key as keyof UserUpdates] = value as string;
        console.log(`Added to updates: ${key} - ${value}`);
      }
    });

    Object.assign(user, updates);

    try {
      await user.save();
    } catch (error) {
      console.error('Error saving user:', error);
      return NextResponse.json(
        { message: 'Failed to save user data' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: 'User updated successfully',
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
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
