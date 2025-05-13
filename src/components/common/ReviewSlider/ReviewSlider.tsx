import { IReview } from '@/sections/MainPageSection/ReviewsSection/ReviewsSection';

interface ReviewSliderProps {
  reviews: IReview[];
}

export const ReviewSlider = ({ reviews }: ReviewSliderProps) => {
  console.log('reviews', reviews);
  return <div>ReviewSlider</div>;
};
