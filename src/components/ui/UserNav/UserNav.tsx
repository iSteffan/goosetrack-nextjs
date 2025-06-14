'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

import CalendarIcon from '@/public/icon/sidebarCalendar.svg';
import StatIcon from '@/public/icon/sidebarStatistics.svg';
import UserIcon from '@/public/icon/sidebarUser.svg';

interface IUserNav {
  onClose?: () => void;
}

export const UserNav = ({ onClose }: IUserNav) => {
  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations('UserNav');

  const getLink = (path: string) => `/${locale}${path}`;

  const getLinkClasses = (href: string) => {
    const isActive = pathname.startsWith(href);
    return `group flex gap-[10px] rounded-[8px] px-[20px] py-[16px] text-[14px] md:text-[16px] font-600 transition-colors dark:text-white dark:hover:bg-blueMain
      ${isActive ? 'bg-bluePale text-blueMain dark:bg-blueMain' : 'text-grayCustom dark:hover:bg-blueMain hover:bg-bluePale hover:text-blueMain dark:focus:bg-blueMain focus:bg-bluePale focus:text-blueMain'}`;
  };

  const getIconClasses = (href: string) => {
    const isActive = pathname.startsWith(href);
    return `h-[20px] w-[20px] md:h-[24px] md:w-[24px] dark:stroke-white dark:group-hover:stroke-white ${isActive ? 'stroke-blueMain' : 'stroke-grayCustom group-hover:stroke-blueMain'}`;
  };

  return (
    <nav>
      <div className="mb-[24px] flex items-center justify-between">
        <p className="dark:text-#FAFAFA4D text-[12px] font-600 dark:text-grayTheme md:text-[14px] md:text-grayCustom">
          {t('panel')}
        </p>
        <LocaleSwitcher />
      </div>

      <ul className="flex flex-col gap-[18px] md:gap-[16px]">
        <li>
          <Link
            href={getLink('/account')}
            className={getLinkClasses(getLink('/account'))}
            onClick={onClose}
          >
            <UserIcon className={getIconClasses(getLink('/account'))} />
            {t('account')}
          </Link>
        </li>
        <li>
          <Link
            href={getLink('/calendar')}
            className={getLinkClasses(getLink('/calendar'))}
            onClick={onClose}
          >
            <CalendarIcon className={getIconClasses(getLink('/calendar'))} />
            {t('calendar')}
          </Link>
        </li>
        <li>
          <Link
            href={getLink('/statistics')}
            className={getLinkClasses(getLink('/statistics'))}
            onClick={onClose}
          >
            <StatIcon className={getIconClasses(getLink('/statistics'))} />
            {t('statistics')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
