import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { logout } from '@/utils/auth';

import LogoutIcon from '@/public/icon/logout.svg';

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('You have successfully logged out.');
      router.push('/en');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btnEffect flex items-center gap-[6px] rounded-[16px] bg-blueMain px-[28px] py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.28px] text-white md:text-[18px] md:leading-[1.33] md:tracking-[-0.36px]"
    >
      Log out
      <LogoutIcon className="h-[18px] w-[18px] stroke-white md:h-[20px] md:w-[20px]" />
    </button>
  );
};
