'use client';

import { useQueryClient, useQuery } from '@tanstack/react-query';
// import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

import { getUser } from '@/utils/getAuth';

// import 'react-loading-skeleton/dist/skeleton.css';

export const UserInfo = () => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(['user']);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    notifyOnChangeProps: ['data'], // Only re-render when data changes
    initialData: cachedData, // Set initial data from cache
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['user'])?.dataUpdatedAt,
  });

  // console.log('isloading', isLoading);
  const firstLetter = data?.user?.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-[8px] md:gap-[14px]">
      <p className="text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:text-[18px] md:leading-[1]">
        {data?.user?.name}
      </p>

      {data?.user?.avatarURL ? (
        <Image
          src={data?.user?.avatarURL}
          alt="user avatar"
          width={32}
          height={32}
        />
      ) : (
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
          {firstLetter}
        </div>
      )}
    </div>
  );

  // return (
  //   <>
  //     {!isLoading && (
  //       <div className="flex items-center gap-[8px] md:gap-[14px]">
  //         <p className="text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:text-[18px] md:leading-[1]">
  //           {data?.user?.name}
  //         </p>

  //         {data?.user?.avatarURL ? (
  //           <Image
  //             src={data?.user?.avatarURL}
  //             alt="user avatar"
  //             width={32}
  //             height={32}
  //           />
  //         ) : (
  //           <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
  //             {firstLetter}
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </>
  // );
};
