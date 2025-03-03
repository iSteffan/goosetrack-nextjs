// import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/routing';
// // import { redirect } from 'next/navigation';

// import {
//   AuthSection,
//   DescriptionSection,
//   ReviewsSection,
// } from '@/sections/MainPageSection';

// import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

// export default function HomePage() {
//   const t = useTranslations('HomePage');

//   // const token =
//   //   typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   // console.log('token', token);

//   // if (token) {
//   //   redirect('/en/calendar');
//   // }

//   return (
//     <>
//       <h1>{t('title')}</h1>
//       <Link href="/account">{t('account')}</Link>
//       <div className="flex flex-col">
//         <Link
//           href="/"
//           locale="en"
//           className="bg-slate-500 text-[20px] dark:bg-orange-900"
//         >
//           Switch to English
//         </Link>
//         <Link
//           href="/"
//           locale="uk"
//           className="bg-slate-500 text-[20px] dark:bg-orange-900"
//         >
//           Switch to Ukrainian
//         </Link>
//       </div>

//       <ThemeToggle />

//       <AuthSection />
//       <DescriptionSection />
//       <ReviewsSection />
//     </>
//   );
// }
// Цей файл працює тільки на сервері
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import {
  AuthSection,
  DescriptionSection,
  ReviewsSection,
} from '@/sections/MainPageSection';

import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

// Цей компонент відображатиметься на клієнті
export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <>
      <h1>{t('title')}</h1>
      <Link href="/account">{t('account')}</Link>
      <div className="flex flex-col">
        <Link
          href="/"
          locale="en"
          className="bg-slate-500 text-[20px] dark:bg-orange-900"
        >
          Switch to English
        </Link>
        <Link
          href="/"
          locale="uk"
          className="bg-slate-500 text-[20px] dark:bg-orange-900"
        >
          Switch to Ukrainian
        </Link>
      </div>

      <ThemeToggle />

      <AuthSection />
      <DescriptionSection />
      <ReviewsSection />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }];
}
