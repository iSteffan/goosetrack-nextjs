'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const locales = ['en', 'uk'];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.push(`/${newLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`);
    }
  };

  return (
    <div className="flex space-x-2">
      {locales.map(lng => (
        <button
          key={lng}
          onClick={() => switchLocale(lng)}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            locale === lng
              ? 'bg-blueMain text-white'
              : 'bg-[#E5EDFA] text-black hover:bg-gray-300'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
