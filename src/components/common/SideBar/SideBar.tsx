import { LogoutBtn } from '@/components/ui/LogoutBtn/LogoutBtn';
import { UserNav } from '@/components/ui/UserNav/UserNav';

export const SideBar = () => {
  return (
    <aside>
      <UserNav />
      SideBar
      <LogoutBtn />
    </aside>
  );
};
