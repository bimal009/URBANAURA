import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Always keep this secret safe!

// Function to generate a JWT token
export function generateToken(email: string) {
  if (!SECRET_KEY) {
    throw new Error('JWT Secret key is missing');
  }

  const token = jwt.sign(
    { email },         // Payload
    SECRET_KEY,        // Secret Key
    { expiresIn: '7d' } // Optional: Token expires in 7 days
  );

  console.log('Generated Token:', token);

  return token;
}
