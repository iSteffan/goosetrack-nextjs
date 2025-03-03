import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';

export const Header = () => {
  return (
    <header className="flex px-[20px] py-[24px] md:px-[32px] xl:pb-[] xl:pt-[32px]">
      <AddFeedbackBtn />
      <ThemeToggle />
      <UserInfo />
    </header>
  );
};
