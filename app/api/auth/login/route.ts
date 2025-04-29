import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { generateToken } from '@/utils/jwt'
import * as bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    })

    if (!user) {
      return new NextResponse('Invalid credentials', { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return new NextResponse('Invalid credentials', { status: 401 })
    }

    const token = await generateToken(user.email)
    
    // Set the cookie in the response
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token
    })
    
    // Add cookie to the response
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[LOGIN]', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    )
  }
}