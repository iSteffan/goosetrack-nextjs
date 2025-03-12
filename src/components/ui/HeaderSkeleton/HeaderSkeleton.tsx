import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const HeaderSkeleton = () => {
  return (
    <div className="flex h-[32px] w-[231px] items-center justify-around gap-[18px] rounded-[6px] border-[0.5px] md:h-[44px] md:w-[314px] md:gap-[24px]">
      <div className="w-[97px] md:w-[130px]">
        <Skeleton className="h-[26px] md:h-[44px]" />
      </div>

      <div className="flex items-center gap-[8px] md:gap-[14px]">
        <div className="w-[18px] md:w-[32px]">
          <Skeleton circle className="h-[18px] md:h-[32px]" />
        </div>

        <div className="w-[44px] md:w-[56px]">
          <Skeleton className="h-[12px] md:h-[20px]" />
        </div>

        <div className="w-[26px] md:w-[38px]">
          <Skeleton circle className="h-[26px] md:h-[38px]" />
        </div>
      </div>
    </div>
  );
};
