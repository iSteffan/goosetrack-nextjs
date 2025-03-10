import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';
import MenuIcon from '@/public/icon/menu.svg';

interface IHeader {
  pageName: string;
  onOpen: () => void;
}

export const Header = ({ pageName, onOpen }: IHeader) => {
  return (
    <header className="bg-grayBg">
      <div className="flex items-center justify-between px-[20px] py-[24px] md:px-[32px] xl:pb-[] xl:pt-[32px]">
        <p className="ml-[321px] hidden text-[32px] font-700 capitalize dark:text-white xl:block">
          {pageName}
        </p>
        <button
          type="button"
          className="group xl:hidden"
          onClick={() => onOpen()}
        >
          <MenuIcon className="h-[24px] w-[24px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white" />
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
