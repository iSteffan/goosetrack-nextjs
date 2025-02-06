import en from '../data/locales/en/en.json';
import uk from '../data/locales/uk/uk.json';

import { useParams } from 'next/navigation';

const translations: Record<string, any> = { en, uk };

export function useTranslations() {
  const { locale } = useParams(); //

  return (key: string) => translations[locale]?.[key] || key;
}
