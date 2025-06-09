'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations, useLocale } from 'next-intl';

import { logout } from '@/utils/getAuth';

import LogoutIcon from '@/public/icon/logout.svg';

export const LogoutBtn = () => {
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations('LogoutBtn');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logout();
      toast.success(t('logoutSuccess'));
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error(t('logoutError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btnEffect absolute bottom-[24px] flex items-center gap-[6px] rounded-[16px] bg-blueMain px-[28px] py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.28px] text-white md:bottom-[32px] md:text-[18px] md:leading-[1.33] md:tracking-[-0.36px]"
    >
      {t('logout')}
      {isLoading ? (
        <div className="h-[18px] w-[18px] animate-spin rounded-full border-[2px] border-white border-t-transparent md:h-[20px] md:w-[20px]" />
      ) : (
        <LogoutIcon className="h-[18px] w-[18px] stroke-white md:h-[20px] md:w-[20px]" />
      )}
    </button>
  );
};
