import {
  AuthSection,
  DescriptionSection,
  ReviewsSection,
} from '@/sections/MainPageSection';

export default function HomePage() {
  return (
    <>
      <AuthSection />
      <DescriptionSection />
      <ReviewsSection />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uk' }];
}
