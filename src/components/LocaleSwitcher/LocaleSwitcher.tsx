import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const { locale, pathname } = useRouter();

  return (
    <div>
      <Link href={pathname} locale="en">
        <button disabled={locale === 'en'}>English</button>
      </Link>
      <Link href={pathname} locale="uk">
        <button disabled={locale === 'uk'}>Українська</button>
      </Link>
    </div>
  );
}
