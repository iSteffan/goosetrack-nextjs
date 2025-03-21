import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

export const UserFormSkeleton = () => {
  return (
    <div className="relative h-[653px] w-full rounded-[16px] bg-white px-[18px] pb-[40px] pt-[59px] dark:bg-blackAccentBg md:h-[854px] md:px-[175px] md:pt-[40px] xl:h-[752px] xl:px-[164px] xl:py-[60px]">
      {/* avatar */}
      <div className="absolute left-1/2 top-[-32px] w-[72px] translate-x-[-50%] md:relative md:left-0 md:top-0 md:mx-auto md:mb-[20px] md:w-[124px] md:transform-none xl:mb-[18px]">
        <Skeleton circle className="h-[72px] md:h-[124px]" />
      </div>

      <div className="mb-[4px] md:mb-[8px] xl:mb-[6px]">
        <Skeleton className="h-[18px]" />
      </div>

      <div className="mb-[32px] xl:mb-[42px]">
        <Skeleton className="h-[14px]" />
      </div>

      {/* input */}
      <div className="mb-[38px] flex flex-col gap-[16px] md:gap-[22px] xl:mb-[86px] xl:grid xl:grid-cols-2 xl:gap-x-[50px]">
        <div className="">
          <Skeleton className="h-[64px] md:h-[72px]" />
        </div>
        <div className="">
          <Skeleton className="h-[64px] md:h-[72px]" />
        </div>
        <div className="">
          <Skeleton className="h-[64px] md:h-[72px]" />
        </div>
        <div className="">
          <Skeleton className="h-[64px] md:h-[72px]" />
        </div>
        <div className="">
          <Skeleton className="h-[64px] md:h-[72px]" />
        </div>
      </div>

      {/* button */}
      <div className="mx-auto w-[195px] md:w-[262px]">
        <Skeleton className="h-[46px] md:h-[48px]" />
      </div>
    </div>
  );
};
