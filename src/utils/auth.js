import jwt from 'jsonwebtoken';

export const verifyToken = req => {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};
