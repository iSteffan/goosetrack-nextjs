// import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
// import { useRouter } from 'next/router';

export default function Page() {
  const t = useTranslations('AccountPage');
  // const router = useRouter();

  // const handleLanguageChange = (newLang: string) => {

  //   const { pathname, query } = router;
  //   router.push({ pathname, query }, pathname, { locale: newLang });
  // };

  return (
    <>
      <h1>{t('title')}</h1>
      <Link href="/">{t('home')}</Link>
      <div className="flex flex-col">
        <Link
          href="/account"
          locale="en"
          className="bg-slate-500 text-[20px] dark:bg-orange-900"
        >
          Switch to English
        </Link>
        <Link
          href="/account"
          locale="uk"
          className="bg-slate-500 text-[20px] dark:bg-orange-900"
        >
          Switch to Ukrainian
        </Link>
        {/* <button onClick={() => handleLanguageChange('en')}>
          {t('english')}
        </button>
        <button onClick={() => handleLanguageChange('uk')}>
          {t('ukrainian')}
        </button> */}
      </div>
      {/* <ThemeToggle /> */}
    </>
  );
}
