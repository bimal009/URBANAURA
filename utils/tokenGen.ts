import jwt from 'jsonwebtoken';

type Payload = {
  email: string;
  id: string;
  role?: string;
};

export const tokenGen = (payload: Payload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
