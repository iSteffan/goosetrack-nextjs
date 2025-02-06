// import Link from 'next/link';

// export default function LocaleSwitcher() {
//   return (
//     <div>
//       <Link href="/" locale="en">
//         EN
//       </Link>
//       <Link href="/" locale="uk">
//         UK
//       </Link>
//     </div>
//   );
// }

'use client';

import { useParams, useRouter } from 'next/navigation';

export default function LocaleSwitcher() {
  const { locale } = useParams();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')} disabled={locale === 'en'}>
        🇬🇧 English
      </button>
      <button onClick={() => changeLanguage('uk')} disabled={locale === 'uk'}>
        🇺🇦 Українська
      </button>
    </div>
  );
}
