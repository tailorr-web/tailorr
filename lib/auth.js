import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dewi-tailor-secret-key-2026';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
