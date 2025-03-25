import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const FeedbackFormSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div className="w-[295px] md:w-[404px]">
        <div className="mb-[2px] md:mb-[7px]">
          <Skeleton className="h-[14px]" />
        </div>

        <div className="mb-[18px]">
          <Skeleton className="h-[24px]" />
        </div>

        <div className="mb-[6px]">
          <Skeleton className="h-[14px]" />
        </div>

        <div className="mb-[12px]">
          <Skeleton className="h-[142px]" />
        </div>

        <div>
          <Skeleton className="h-[42px]" />
        </div>
      </div>
    </SkeletonTheme>
  );
};
