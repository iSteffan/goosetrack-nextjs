import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// export const authMiddleware = (req: NextRequest) => {
//   const token = req.cookies.get('token')?.value;
//   if (!token) return null;

//   try {
//     return jwt.verify(token, process.env.JWT_SECRET as string);
//   } catch {
//     return null;
//   }
// };

export const authMiddleware = (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  console.log('Token:', token); // Додайте цей лог, щоб побачити значення токена
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
};
