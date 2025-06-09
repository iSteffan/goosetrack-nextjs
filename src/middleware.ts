import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Захищені маршрути (потрібен токен)
const protectedRoutes = ['/account', '/calendar', '/statistics'];

// Публічні маршрути (тільки для неавторизованих)
const publicRoutes = ['/', '/login', '/register'];

export default function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get('token');
  const locale = pathname.split('/')[1]; // "uk" або "en"

  const isProtectedRoute = protectedRoutes.some(route =>
    new RegExp(`^/(uk|en)${route}(/.*)?$`).test(pathname),
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  const isPublicRoute = publicRoutes.some(route =>
    new RegExp(`^/(uk|en)?${route === '/' ? '' : route}$`).test(pathname),
  );

  if (isPublicRoute && token) {
    const calendarUrl = new URL(`/${locale}/calendar`, origin);
    return NextResponse.redirect(calendarUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(uk|en)/:path*'],
};
