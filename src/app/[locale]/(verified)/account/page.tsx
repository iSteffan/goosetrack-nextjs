// import { Link } from '@/i18n/routing';
// import { useTranslations } from 'next-intl';

import { UserForm } from '@/components/common/UserForm/UserForm';

export default function Page() {
  // const t = useTranslations('AccountPage');

  // const handleLanguageChange = (newLang: string) => {

  //   const { pathname, query } = router;
  //   router.push({ pathname, query }, pathname, { locale: newLang });
  // };

  return (
    <section className="bg-grayBg pb-[40px] pt-[95px]">
      <div className="container xl:px-[32px]">
        <UserForm />
      </div>
      {/* <h1>{t('title')}</h1>
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

      </div> */}
    </section>
  );
}
