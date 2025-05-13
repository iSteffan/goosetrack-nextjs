import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { ReviewSliderCard } from '@/components/ui/ReviewSliderCard/ReviewSliderCard';
import { IReview } from '@/sections/MainPageSection/ReviewsSection/ReviewsSection';

import 'swiper/css';
import 'swiper/css/navigation';

interface ReviewSliderProps {
  reviews: IReview[];
}

export const ReviewSlider = ({ reviews }: ReviewSliderProps) => {
  const swiperParams = {
    centeredSlides: false,
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      1440: { slidesPerView: 2, spaceBetween: 24 },
    },
  };

  console.log('reviews', reviews);
  return (
    <div>
      <Swiper {...swiperParams}>
        {reviews.map(review => (
          <SwiperSlide key={review._id}>
            <ReviewSliderCard data={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
