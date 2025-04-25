import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')

  // ✅ Redirect logged-in users away from login/register
  const isAuthPage = path === '/login' || path === '/register'
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ✅ Always allow static files and Next.js internals
  if (
    path.startsWith('/_next') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // ✅ Block API access to cart if no token
  if (path.startsWith('/api/cart') && !token) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // ✅ Public routes don't need auth
  if (path === '/' || path.startsWith('/products')) {
    return NextResponse.next()
  }

  // ✅ Protect sensitive pages
  if (
    (path.startsWith('/cart') || path.startsWith('/profile') || path.startsWith('/settings')) &&
    !token
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/cart',
    '/profile/:path*',
    '/settings/:path*',
    '/api/cart/:path*',
    '/login',
    '/register',
  ],
}
