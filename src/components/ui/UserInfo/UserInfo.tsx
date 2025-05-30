'use client';

import { useUserStore } from '@/store/userStore';
import { Avatar } from '../Avatar/Avatar';

export const UserInfo = () => {
  const { user } = useUserStore();

  return (
    <div className="flex items-center gap-[8px] md:gap-[14px]">
      <p className="max-w-[80px] truncate text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:max-w-[200px] md:text-[18px] md:leading-[1]">
        {user?.name}
      </p>

      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
        <Avatar avatarURL={user?.avatarURL} name={user?.name} size={32} />
      </div>
    </div>
  );
};
