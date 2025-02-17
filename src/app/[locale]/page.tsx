import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
// import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
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

      {/* <ThemeToggle /> */}
    </div>
  );
}
