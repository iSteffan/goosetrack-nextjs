import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/en/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/(en|ua)/calendar/:path*',
    '/(en|ua)/account/:path*',
    '/(en|ua)/statistics/:path*',
  ],
};
