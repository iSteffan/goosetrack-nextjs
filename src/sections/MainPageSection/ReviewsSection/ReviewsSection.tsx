'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ReviewSlider } from '@/components/common/ReviewSlider/ReviewSlider';
import { ReviewSliderLoader } from '@/components/ui/ReviewSliderLoader/ReviewSliderLoader';
import { getAllReviews } from '@/utils/getReviews';

export interface IReview {
  _id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
  avatarURL: string;
}

export const ReviewsSection = () => {
  const t = useTranslations('ReviewsSection');
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await getAllReviews();
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching all reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="pb-[64px] pt-[32px]">
      <div className="container">
        <h2 className="mb-[40px] text-center text-[28px] font-700 leading-[1.14] text-blueMain">
          {t('title')}
        </h2>
        {isLoading ? (
          <ReviewSliderLoader />
        ) : (
          <ReviewSlider reviews={reviews} />
        )}
      </div>
    </section>
  );
};
