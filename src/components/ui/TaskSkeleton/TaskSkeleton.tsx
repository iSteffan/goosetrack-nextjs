import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const TaskSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div className="cardBorder rounded-[8px] border-[1px] bg-white p-[18px] dark:bg-blackAccentBg md:p-[20px]">
        {/* category */}
        <div className="mb-[24px]">
          <Skeleton className="h-[34px]" />
        </div>

        {/* task */}
        <div className="rounded-[8px] border-[1px] border-taskCardBorder bg-grayBg px-[14px] pb-[18px] pt-[14px] dark:border-darkThemeBorder dark:bg-blackLightBg">
          <Skeleton className="mb-[28px] h-[16px]" />

          <div className="flex items-end gap-[8px]">
            <div className="w-[37px]">
              <Skeleton circle className="h-[32px]" />
            </div>

            <div className="w-full">
              <Skeleton className="h-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
