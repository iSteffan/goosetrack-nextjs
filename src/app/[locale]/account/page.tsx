import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('AccountPage');

  return (
    <>
      <h1>{t('title')}</h1>
      <Link href="/">{t('home')}</Link>
      <div className="flex flex-col">
        <Link href="/" locale="en" className="text-[20px]">
          Switch to English
        </Link>
        <Link href="/" locale="uk" className="text-[20px]">
          Switch to Ukrainian
        </Link>
      </div>{' '}
    </>
  );
}
