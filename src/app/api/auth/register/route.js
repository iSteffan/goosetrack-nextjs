import bcrypt from 'bcrypt';

import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export async function POST(req) {
  const { email, password } = await req.json();
  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'Користувач вже існує' }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();
  return new Response(JSON.stringify({ message: 'Реєстрація успішна' }), {
    status: 201,
  });
}
