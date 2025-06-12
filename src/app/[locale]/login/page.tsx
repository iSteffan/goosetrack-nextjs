'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { AuthForm } from '@/components/common/AuthForm/AuthForm';

export default function Page() {
  const t = useTranslations('AuthForm');

  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-blueLight">
      <div className="container relative z-10 flex flex-col items-center">
        <AuthForm type="logIn" />

        <div className="mt-[18px] text-center md:mt-[24px]">
          <Link
            href={`/${locale}/register`}
            className="scale inline-block text-[12px] font-600 leading-[1.16] text-blueMain underline md:text-[18px] md:leading-[1.33]"
          >
            {t('signUpBtn')}
          </Link>
        </div>
      </div>

      {/* Goose image */}
      <div className="absolute right-[60px] top-[230px] hidden xl:block">
        <Image
          src="/image/logInGoose.png"
          alt="goose"
          width={368}
          height={521}
        />
      </div>
    </section>
  );
}
