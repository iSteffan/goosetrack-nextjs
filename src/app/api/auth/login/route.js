import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export async function POST(req) {
  const { email, password } = await req.json();
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ message: 'Невірний email або пароль' }),
      { status: 401 },
    );
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Response(
      JSON.stringify({ message: 'Невірний email або пароль' }),
      { status: 401 },
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
