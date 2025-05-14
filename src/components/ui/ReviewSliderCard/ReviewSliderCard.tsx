import ReactStars from 'react-stars';

import { IReview } from '@/sections/MainPageSection/ReviewsSection/ReviewsSection';
import { Avatar } from '../Avatar/Avatar';

interface ReviewSliderCardProps {
  data: IReview;
}
export const ReviewSliderCard = ({ data }: ReviewSliderCardProps) => {
  return (
    <div className="border-[rgba(17, 17, 17, 0.10)] rounded-[8px] border-[1px] p-[24px]">
      <div className="mb-[24px] flex gap-[18px]">
        <div className="h-[50px] w-[50px]">
          <Avatar avatarURL={data.avatarURL} name={data.username} size={50} />
        </div>

        <div>
          <p className="fonr-700 text-[18px] text-blackCustom">
            {data.username}
          </p>

          <ReactStars
            count={5}
            size={24}
            color2={'#FFAC33'}
            color1={'#CEC9C1'}
            value={data.rating}
            half={true}
            edit={false}
          />
        </div>
      </div>

      <p className="truncate-text h-[72px] text-[14px] leading-[1.28] text-blackCustom opacity-[0.7]">
        {data.comment}
      </p>
    </div>
  );
};
