import Link from 'next/link';

export default function LocaleSwitcher() {
  return (
    <div>
      <Link href="/" locale="en">
        EN
      </Link>
      <Link href="/" locale="uk">
        UK
      </Link>
    </div>
  );
}
