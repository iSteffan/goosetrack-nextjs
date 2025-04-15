'use client';

import Image from 'next/image';

import { useUserStore } from '@/store/userStore';

export const UserInfo = () => {
  const { user } = useUserStore();

  const firstLetter = user?.name?.charAt(0)?.toUpperCase();

  return (
    <div className="flex items-center gap-[8px] md:gap-[14px]">
      <p className="max-w-[80px] truncate text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:max-w-[200px] md:text-[18px] md:leading-[1]">
        {user?.name}
      </p>

      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
        {user?.avatarURL ? (
          <Image
            src={user?.avatarURL}
            alt="user avatar"
            width={32}
            height={32}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <p>{firstLetter}</p>
        )}
      </div>
    </div>
  );
};
