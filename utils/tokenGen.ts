import { sign } from 'hono/jwt'

type Payload = {
  email: string;
  id: string;
};

export const tokenGen = async (payload: Payload): Promise<string> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = await sign(payload, secret, "HS256");
  return token;
};
