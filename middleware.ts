import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get('token')?.value
  
  // Define public and protected routes
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'
  const protectedRoutes = ['/cart', '/profile', '/orders']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Extract the redirect URL if it exists in the request
  const url = request.nextUrl.clone()
  const redirectParam = request.nextUrl.searchParams.get('redirect')
  
  // If trying to access auth pages while logged in, redirect to home or to the redirect param
  if (isAuthPage && token) {
    const redirectUrl = redirectParam || '/'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // For protected pages that require auth, redirect to login if not logged in
  if (isProtectedRoute && !token) {
    // Add the current path as a redirect parameter
    url.pathname = '/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: ['/login', '/signup', '/cart', '/profile', '/orders/:path*'],
}