import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';

export const Header = () => {
  return (
    <header className="flex px-[20px] py-[24px] md:px-[32px] xl:pb-[] xl:pt-[32px]">
      <AddFeedbackBtn />
      <ThemeToggle />
      <UserInfo  />
    </header>
  );
};

// 'use client';
// import { usePathname } from 'next/navigation';
// import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
// import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
// import { UserInfo } from '@/components/ui/UserInfo/UserInfo';

// export const Header = () => {
//   const pathname = usePathname();

//   // Вкажи маршрути, на яких має рендеритись Header
//   const headerRoutes = [
//     '/en/account',
//     '/en/calendar',
//     '/en/statistics',
//     '/uk/account',
//     '/uk/calendar',
//     '/uk/statistics',
//   ];

//   // Перевірка, чи поточний маршрут входить до списку потрібних маршрутів
//   if (!headerRoutes.includes(pathname)) {
//     return null; // Не рендерити Header, якщо маршрут не входить до списку
//   }

//   return (
//     <header className="flex px-[20px] py-[24px] md:px-[32px] xl:pb-[] xl:pt-[32px]">
//       <AddFeedbackBtn />
//       <ThemeToggle />
//       <UserInfo />
//     </header>
//   );
// };
