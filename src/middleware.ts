
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Correct import for server-side cookie access in App Router
import { cookies } from 'next/headers';


// Define which routes are protected and require authentication
const protectedRoutes = ['/locations', '/rentals', '/hotels'];

// Define routes that an authenticated user should be redirected away from (e.g., to home)
const authRedirectRoutes = ['/login', '/signup'];

export function middleware(req: NextRequest) {
  const cookieStore = cookies(); // Get cookie store for server-side access
  const sessionCookie = cookieStore.get('travillo-session'); // Access the specific session cookie
  const isAuthenticated = !!sessionCookie?.value; // Check if the cookie exists and has a value

  const { pathname } = req.nextUrl;

  // Scenario 1: User tries to access a protected route
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Not authenticated: Redirect to login page, saving the intended destination
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Authenticated: Allow access to the protected route
    return NextResponse.next();
  }

  // Scenario 2: User tries to access login or signup page
  if (authRedirectRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Already authenticated: Redirect to the homepage
      return NextResponse.redirect(new URL('/', req.url));
    }
    // Not authenticated: Allow access to login/signup page
    return NextResponse.next();
  }

  // For any other routes, allow access
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
