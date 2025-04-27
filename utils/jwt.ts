import { SignJWT } from 'jose'

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key' // Use a secure key in your .env file

// Function to generate a JWT token
export async function generateToken( email: string) {
  const iat = Math.floor(Date.now() / 1000)  // Issued at time
  const exp = iat + 60 * 60 * 24 // 1 day expiration (you can change it)

  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })  // Using HMAC with SHA-256
    .setIssuedAt(iat)  // Issued at time
    .setExpirationTime(exp)  // Expiration time
    .sign(new TextEncoder().encode(SECRET_KEY))  // Sign the token with your secret key

  return token
}
