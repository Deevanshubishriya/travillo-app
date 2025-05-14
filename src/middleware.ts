
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next/server'; // Import for server-side cookie access

// Define which routes are protected
const protectedRoutes = ['/locations', '/rentals', '/hotels'];

export function middleware(req: NextRequest) {
  // Use req.cookies.get for Next.js 13+ App Router middleware
  const sessionCookie = req.cookies.get('travillo-session');
  const isAuthenticated = !!sessionCookie?.value; // Check if the cookie exists and has a value

  const { pathname } = req.nextUrl;

  // If trying to access a protected route and not authenticated, redirect to login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirectedFrom', pathname); // Optional: pass redirect info
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access login or signup page and already authenticated, redirect to home or a dashboard
  if ((pathname === '/login' || pathname === '/signup') && isAuthenticated) {
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
     * - images (public images folder)
     * - assets (public assets folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
  ],
};
