// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || ''
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
  
  // If trying to access auth pages while logged in, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // For protected pages that require auth, redirect to login if not logged in
  // Add your protected routes here
  const protectedRoutes = ['/cart', '/profile', '/orders']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ['/login', '/signup', '/cart', '/profile', '/orders/:path*'],
}