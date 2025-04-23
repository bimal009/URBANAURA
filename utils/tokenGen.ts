import jwt from "jsonwebtoken";

type Payload = {
  email: string;
  id: string;
};

export const tokenGen = (payload: Payload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};
