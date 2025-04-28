import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key' // Use a secure key in your .env file

// Function to generate a JWT token
export function generateToken(email: string) {
  

  const token = jwt.sign(
    { email }, 
    SECRET_KEY, 
    { 
      algorithm: 'HS256', 
      expiresIn: 60 * 60 * 60 * 24, 
     
    }
  )
  console.log(token)

  return token
}
