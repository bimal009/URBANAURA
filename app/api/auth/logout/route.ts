import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await removeTokenCookie()
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[LOGOUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 