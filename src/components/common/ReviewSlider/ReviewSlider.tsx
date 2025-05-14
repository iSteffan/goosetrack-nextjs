import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { ReviewSliderCard } from '@/components/ui/ReviewSliderCard/ReviewSliderCard';
import { IReview } from '@/sections/MainPageSection/ReviewsSection/ReviewsSection';
import ArrowIcon from '@/public/icon/sliderArrow.svg';

import 'swiper/css';
import 'swiper/css/navigation';

import css from './ReviewSlider.module.css';

interface ReviewSliderProps {
  reviews: IReview[];
}

export const ReviewSlider = ({ reviews }: ReviewSliderProps) => {
  const swiperParams = {
    centeredSlides: false,
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: `.button-next`,
      prevEl: `.button-prev`,
    },
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      1440: { slidesPerView: 2, spaceBetween: 24 },
    },
  };

  return (
    <div>
      <Swiper {...swiperParams}>
        {reviews.map(review => (
          <SwiperSlide key={review._id}>
            <ReviewSliderCard data={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-[8px] flex justify-center gap-[24px]">
        <button
          type="button"
          className={`button-prev ${css['button']}`}
          aria-label="Previous slide"
        >
          <ArrowIcon
            className={`h-[50px] w-[50px] md:h-[61px] md:w-[61px] ${css['icon']}`}
          />
        </button>
        <button
          type="button"
          className={`button-next ${css['button']}`}
          aria-label="Next slide"
        >
          <ArrowIcon
            className={`h-[50px] w-[50px] rotate-180 md:h-[61px] md:w-[61px] ${css['icon']}`}
          />
        </button>
      </div>
    </div>
  );
};
