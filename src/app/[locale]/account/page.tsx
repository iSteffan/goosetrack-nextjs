// import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('AccountPage');

  return (
    <>
      <h1>{t('title')}</h1>
      <Link href="/">{t('home')}</Link>
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
      {/* <ThemeToggle /> */}
    </>
  );
}
