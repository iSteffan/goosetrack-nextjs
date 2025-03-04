'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

export const UserInfo = ({ data }) => {
  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData(['user']);

  const firstLetter = data?.user?.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-[8px] md:gap-[14px]">
      <p className="text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:text-[18px] md:leading-[1]">
        {data?.user?.name}
      </p>

      {data?.user?.avatarURL ? (
        <Image src={data?.user?.avatarURL} alt="user avatar" />
      ) : (
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
          {firstLetter}
        </div>
      )}
    </div>
  );
};
