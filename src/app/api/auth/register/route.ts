import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { dbConnect } from '@/utils/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    // Валідація вхідних даних
    if (!name || name.length < 2) {
      return NextResponse.json(
        { message: 'Name must be at least 2 characters' },
        { status: 400 },
      );
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 },
      );
    }

    // Перевірка чи існує користувач
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
