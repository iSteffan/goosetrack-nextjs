import LocaleSwitcher from '@/components/LocaleSwitcher/localeSwitcher';
import { getTranslations } from '../utils/getTranslations';

interface PageProps {
  params: { locale: string };
}

export default function Home({ params }: PageProps) {
  const { locale } = params;
  const translations = getTranslations(locale);

  return (
    <div>
      <h1>Index page</h1>
      <div>{translations.welcome}</div>
      <LocaleSwitcher />
    </div>
  );
}
// export default function Page({ translations }) {
//   return <h1>{translations.welcome}</h1>;
// }
// export default function Page({ params }: PageProps) {
//   const { locale } = params;
//   const translations = getTranslations(locale);

//   return (
//     <div>
//       <h1>{translations.welcome}</h1>
//     </div>
//   );
// }
