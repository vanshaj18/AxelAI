
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('auth-session');
  const { pathname } = request.nextUrl;

  const isAuthenticated = !!sessionCookie;
  
  const isPublicRoute = pathname === '/';
  const isProtectedRoute = !isPublicRoute;

  // If user is authenticated
  if (isAuthenticated) {
    // If they try to access the public login page, redirect to dashboard
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If user is not authenticated
  else {
    // If they try to access a protected route, redirect to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets/logo.png).*)'],
};
