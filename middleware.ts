import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const adminRoutes = ['/admin']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow API routes to pass through
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check for token in cookies
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
  
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    
    
    if (adminRoutes.some(route => path.startsWith(route))) {
      if (payload.role !== 'admin') {
       
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Allow access to protected routes if token is valid
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Path configuration for matching specific routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
