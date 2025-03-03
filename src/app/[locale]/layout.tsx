import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ToastContainer } from 'react-toastify';
import QueryProvider from '@/components/ui/QueryProvider/QueryProvider';

import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ui/ThemeProvider/ThemeProvider';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <QueryProvider>{children}</QueryProvider>
            </main>
            <ToastContainer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// import { NextIntlClientProvider } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';
// import { getMessages } from 'next-intl/server';
// import { notFound } from 'next/navigation';
// import { routing } from '@/i18n/routing';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ToastContainer } from 'react-toastify';

// import { Inter } from 'next/font/google';

// import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

// import './globals.css';
// import 'react-toastify/dist/ReactToastify.css';

// const inter = Inter({ subsets: ['latin'] });

// // Створення клієнта лише один раз для всього додатку
// const queryClient = new QueryClient();

// export function generateStaticParams() {
//   return routing.locales.map(locale => ({ locale }));
// }

// export default async function RootLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { locale: string }; // Замінили Promise на об'єкт для синхронного використання
// }) {
//   const { locale } = params;
//   // Ensure that the incoming `locale` is valid
//   if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
//     notFound();
//   }

//   // Enable static rendering
//   setRequestLocale(locale);

//   // Отримуємо повідомлення асинхронно на сервері
//   const messages = await getMessages(); // Чекаємо на завершення отримання повідомлень

//   return (
//     <html lang={locale} className={inter.className} suppressHydrationWarning>
//       <body>
//         <NextIntlClientProvider messages={messages}>
//           <QueryClientProvider client={queryClient}>
//             <ThemeProvider
//               attribute="class"
//               defaultTheme="system"
//               enableSystem
//               disableTransitionOnChange
//             >
//               <main>{children}</main>
//             </ThemeProvider>
//           </QueryClientProvider>
//         </NextIntlClientProvider>
//         <ToastContainer />
//       </body>
//     </html>
//   );
// }
