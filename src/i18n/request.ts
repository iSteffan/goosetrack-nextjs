import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Тип для locale, який може бути лише "en" або "uk"
type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Чекаємо на значення з проміса
  const resolvedLocale = await requestLocale;

  // Перевіряємо, чи є значення у resolvedLocale, і присвоюємо дефолтне значення, якщо немає
  let locale: Locale;

  if (resolvedLocale && routing.locales.includes(resolvedLocale as Locale)) {
    locale = resolvedLocale as Locale;
  } else {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
