import {
  AuthSection,
  DescriptionSection,
  ReviewsSection,
} from '@/sections/MainPageSection';

import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';

export default function HomePage() {
  return (
    <>
      <ThemeToggle />

      <AuthSection />
      <DescriptionSection />
      <ReviewsSection />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }];
}
