'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import { ReviewSlider } from '@/components/common/ReviewSlider/ReviewSlider';

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
    const fetchAllReviews = async () => {
      try {
        const { data } = await axios.get('/api/reviews/all');
        setReviews(data);
      } catch (error) {
        console.error('Error fetching all reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <section className="pb-[64px] pt-[32px]">
      <div className="container">
        <h2 className="mb-[40px] text-center text-[28px] font-700 leading-[1.14] text-blueMain">
          {t('title')}
        </h2>

        {/* {isLoading && (
          <p className="text-center text-gray-500">{t('loading')}</p>
        )} */}

        {!isLoading && <ReviewSlider reviews={reviews} />}
        {/* <ReviewSlider reviews={reviews} /> */}
      </div>
    </section>
  );
};
