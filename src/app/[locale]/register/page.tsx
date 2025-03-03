import Link from 'next/link';
import Image from 'next/image';

import { AuthForm } from '@/components/common/AuthForm/AuthForm';

import data from '@/data/common.json';

export default function Page() {
  const { logIn } = data;

  return (
    <section className="min-h-screen bg-blueLight py-[155px]">
      <div className="container">
        <AuthForm type="signUp" />

        <div className="mt-[18px] text-center md:mt-[24px]">
          <Link
            href="/en/login"
            className="scale inline-block text-[12px] font-600 leading-[1.16] text-blueMain underline md:text-[18px] md:leading-[1.33]"
          >
            {logIn}
          </Link>
        </div>

        <div className="absolute bottom-0 left-[49px] hidden xl:block">
          <Image
            src="/image/signUpGoose.png"
            alt="goose"
            width={400}
            height={416}
          />
        </div>
      </div>
    </section>
  );
}
