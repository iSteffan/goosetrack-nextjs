import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';
import MenuIcon from '@/public/icon/menu.svg';

export const Header = ({ pageName }) => {
  return (
    <header>
      <div className="flex items-center justify-between px-[20px] py-[24px] md:px-[32px] xl:pb-[] xl:pt-[32px]">
        <p className="capitalize">{pageName}</p>
        <button type="button" className="group xl:hidden">
          <MenuIcon className="h-[24px] w-[24px] stroke-blackCustom transition-colors group-hover:stroke-blueMain" />
        </button>
        <div className="flex items-center">
          <AddFeedbackBtn />
          <ThemeToggle />
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
