// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '@/models/User';
// import dbConnect from '@/utils/dbConnect';

// export async function POST(req) {
//   const { email, password } = await req.json();
//   await dbConnect();

//   const user = await User.findOne({ email });
//   if (!user) {
//     return new Response(
//       JSON.stringify({ message: 'Невірний email або пароль' }),
//       { status: 401 },
//     );
//   }

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     return new Response(
//       JSON.stringify({ message: 'Невірний email або пароль' }),
//       { status: 401 },
//     );
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return new Response(JSON.stringify({ token }), { status: 200 });
// }
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { dbConnect } from '@/utils/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Валідація вхідних даних
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 },
      );
    }

    // Пошук користувача в базі
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 },
      );
    }

    // Генерація JWT-токена
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' },
    );

    // Встановлення токена у cookies
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: { name: user.name, email: user.email },
      },
      { status: 200 },
    );
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 604800,
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
