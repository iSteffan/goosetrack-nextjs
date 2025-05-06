import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

import LogInIcon from '@/public/icon/logIn.svg';
import GooseIcon from '@/public/icon/gooseAuth.svg';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher/LocaleSwitcher';

export const AuthSection = () => {
  const t = useTranslations('AuthSection');
  const locale = useLocale();

  return (
    <section className="bg-blueMain py-[256px]">
      <div className="container">
        <GooseIcon className="mx-auto h-[142px] w-[142px] pb-[2px]" />

        <h1 className="mainPageTitle mb-[32px] md:mb-[40px]">
          <span className="italic">Goose</span>Track
        </h1>

        <div className="flex flex-col items-center gap-[16px] md:gap-[24px]">
          <div className="flex flex-col items-center gap-[16px] md:flex-row md:justify-center md:gap-[24px]">
            <Link
              href={`/${locale}/login`}
              className="scale flex w-[131px] justify-center gap-[6px] rounded-[16px] bg-white py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.028px] text-blueMain"
            >
              {t('login')} <LogInIcon className="h-[18px] w-[18px]" />
            </Link>

            <Link
              href={`/${locale}/register`}
              className="scale text-[14px] font-600 leading-[1.28] text-white underline"
            >
              {t('signup')}
            </Link>
          </div>

          <LocaleSwitcher />
        </div>
      </div>
    </section>
  );
};
