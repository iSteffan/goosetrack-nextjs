// // import LocaleSwitcher from '@/components/LocaleSwitcher/localeSwitcher';
// import { getTranslations } from '../utils/getTranslations';

// interface PageProps {
//   params: { locale: string };
// }

// export default function Home({ params }: PageProps) {
//   const { locale } = params;
//   const translations = getTranslations(locale);

//   return (
//     <div>
//       <h1>Index page</h1>
//       <div>{translations.welcome}</div>
//       {/* <LocaleSwitcher /> */}
//     </div>
//   );
// }
'use client';

import { useTranslations } from '@/utils/getTranslations';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      {/* <p>{t('description')}</p> */}
    </div>
  );
}
