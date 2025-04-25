import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow API routes to pass through
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check for token in cookies
  const token = request.cookies.get('token');
  const role = request.cookies.get('role');

  // If no token, redirect to home
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect admin routes
  if (path.startsWith('/admin')) {
    // If role is not admin, redirect to home
    if (role?.value !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow access to the requested route
  return NextResponse.next();
}

// Path configuration for matching specific routes
export const config = {
  matcher: ['/admin/:path*', '/about/:path*']
}

