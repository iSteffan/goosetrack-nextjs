'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

import CalendarIcon from '@/public/icon/sidebarCalendar.svg';
import StatIcon from '@/public/icon/sidebarStatistics.svg';
import UserIcon from '@/public/icon/sidebarUser.svg';

export const UserNav = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const getLink = (path: string) => `/${locale}${path}`;

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    return `group flex gap-[10px] rounded-[8px] px-[20px] py-[16px] text-[16px] font-600 transition-colors dark:text-white dark:hover:bg-blueMain
      ${isActive ? 'bg-bluePale text-blueMain dark:bg-blueMain' : 'text-grayCustom hover:bg-bluePale hover:text-blueMain focus:bg-bluePale focus:text-blueMain'}`;
  };

  const getIconClasses = (href: string) => {
    const isActive = pathname === href;
    return `h-[20px] w-[20px] md:h-[24px] md:w-[24px] stroke-grayCustom dark:stroke-white dark:group-hover:stroke-white ${isActive ? 'stroke-blueMain' : 'group-hover:stroke-blueMain'}`;
  };

  return (
    <nav className="">
      <p className="md:text-grayCustom dark:text-#FAFAFA4D mb-[24px] text-[12px] font-600 md:text-[14px]">
        User Panel
      </p>
      <ul className="flex flex-col gap-[18px] md:gap-[16px]">
        <li>
          <Link
            href={getLink('/account')}
            className={getLinkClasses(getLink('/account'))}
          >
            <UserIcon className={getIconClasses(getLink('/account'))} />
            My account
          </Link>
        </li>
        <li>
          <Link
            href={getLink('/calendar')}
            className={getLinkClasses(getLink('/calendar'))}
          >
            <CalendarIcon className={getIconClasses(getLink('/calendar'))} />
            Calendar
          </Link>
        </li>
        <li>
          <Link
            href={getLink('/statistics')}
            className={getLinkClasses(getLink('/statistics'))}
          >
            <StatIcon className={getIconClasses(getLink('/statistics'))} />
            Statistics
          </Link>
        </li>
      </ul>
    </nav>
  );
};
