import { LogoutBtn } from '@/components/ui/LogoutBtn/LogoutBtn';
import { UserNav } from '@/components/ui/UserNav/UserNav';
import GooseIcon from '@/public/icon/sidebarGoose.svg';
import CloseIcon from '@/public/icon/x-close.svg';

interface ISideBar {
  onClose?: () => void;
}

export const SideBar = ({ onClose }: ISideBar) => {
  return (
    <aside>
      <div className="relavite px-[20px] py-[24px] md:px-[24px] md:py-[32px]">
        <div className="mb-[64px] flex items-center md:mb-[50px] xl:mb-[32px]">
          <GooseIcon className="mr-[6px] h-[35px] w-[36px] xl:mr-[10px]" />

          <h2 className="text-[16px] font-700 leading-[1.37] text-blueMain dark:text-white md:leading-[1.5] xl:text-[24px] xl:leading-[1]">
            <span className="italic">Goose</span>Track
          </h2>

          <button type="button" onClick={onClose} className="ml-auto xl:hidden">
            <CloseIcon className="h-[24px] w-[24px] stroke-blackCustom transition-colors hover:stroke-blueMain dark:stroke-white dark:hover:stroke-blueMain" />
          </button>
        </div>

        <UserNav />

        <LogoutBtn />
      </div>
    </aside>
  );
};
