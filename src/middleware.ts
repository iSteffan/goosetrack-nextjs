import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Список шляхів, які потребують авторизації
const protectedRoutes = ['/account', '/calendar', '/statistics'];

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Перевіряємо чи шлях належить до захищених маршрутів
  const isProtectedRoute = protectedRoutes.some(route =>
    new RegExp(`^/(uk|en)${route}(/.*)?$`).test(pathname),
  );

  if (isProtectedRoute) {
    // Перевіряємо наявність токена в куках
    const token = req.cookies.get('token');

    if (!token) {
      // Якщо токена немає - редіректимо на сторінку логіна
      const locale = pathname.split('/')[1]; // отримуємо поточну локаль (uk або en)
      const loginUrl = new URL(`/${locale}/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Якщо маршрут не захищений або токен є, продовжуємо обробку за допомогою next-intl middleware
  return intlMiddleware(req);
}

// Вказуємо шляхи, на які повинна діяти middleware
export const config = {
  matcher: ['/', '/(uk|en)/:path*'],
};
