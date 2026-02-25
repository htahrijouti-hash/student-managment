import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Redirect to login if trying to access protected routes without session
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/students') || pathname.startsWith('/courses')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect to dashboard if trying to access login with active session
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/students/:path*', '/courses/:path*', '/login'],
};
