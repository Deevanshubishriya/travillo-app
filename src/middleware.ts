
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next'; // Import for server-side cookie access

// Define which routes are protected
const protectedRoutes = ['/locations', '/rentals', '/hotels'];
// Define routes that should not be accessible if the user is already logged in
const authRoutes = ['/login', '/signup'];

export function middleware(req: NextRequest) {
  const sessionCookie = getCookie('session', { req }); // Use getCookie from cookies-next
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If trying to access a protected route without a session, redirect to login
  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect_to', pathname); // Optionally pass redirect path
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access login/signup page while already logged in, redirect to home or dashboard
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};

