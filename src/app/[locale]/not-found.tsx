'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

import RocketIcon from '@/public/icon/notFoundRocket.svg';

export default function NotFound() {
  const t = useTranslations('404');
  const locale = useLocale();

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-grayBg px-4 text-blackCustom dark:bg-blackLightBg dark:text-white">
      <div className="container text-center">
        <div className="relative mx-auto flex w-full max-w-[252px] items-center justify-between md:mb-[40px] md:max-w-[503px]">
          <p className="text-[100px] font-700 leading-[1.5] text-blueMain md:text-[200px] md:leading-[1.25]">
            4
          </p>
          <RocketIcon className="absolute left-[44px] h-[202px] w-[166px] md:left-[68px] md:h-[445px] md:w-[367px]" />
          <p className="text-[100px] font-700 leading-[1.5] text-blueMain md:text-[200px] md:leading-[1.25]">
            4
          </p>
        </div>

        <p className="mx-auto mb-[24px] block w-full max-w-[281px] text-center text-[14px] leading-[1.28] opacity-[0.7] md:mb-[32px] md:max-w-[388px]">
          {t('text')}
        </p>

        <Link
          href={`/${locale}`}
          className="btnEffect fonr-600 inline-block rounded-[16px] bg-blueMain px-[32px] py-[14px] text-[14px] leading-[1.28] tracking-[-0.28px] text-white md:px-[32px] md:py-[16px] md:text-[18px] md:leading-[1.33] md:tracking-[-0.36px]"
        >
          {t('btn')}
        </Link>
      </div>
    </section>
  );
}
