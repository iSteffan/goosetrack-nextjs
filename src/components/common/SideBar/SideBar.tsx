import { LogoutBtn } from '@/components/ui/LogoutBtn/LogoutBtn';
import { UserNav } from '@/components/ui/UserNav/UserNav';

export const SideBar = () => {
  return (
    <aside>
      <div className="px-[32px] py-[24px] md:px-[24px] md:py-[32px]">
        <UserNav />
        SideBar
        <LogoutBtn />
      </div>
    </aside>
  );
};
