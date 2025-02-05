import en from '../data/locales/en/en.json';
import uk from '../data/locales/uk/uk.json';

export const getTranslations = (locale: string) => {
  return locale === 'uk' ? uk : en;
};
