'use client';

import { startOfWeek, addDays, format } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { useLocale } from 'next-intl';

export const MonthCalendarHead = () => {
  const localeCode = useLocale();
  const dateFnsLocale = localeCode === 'uk' ? uk : enUS;

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <ul className="cardBorder mb-[14px] flex justify-between rounded-[8px] border-[1px] bg-white px-[18px] py-[14px] uppercase dark:bg-blackAccentBg md:mb-[16px] md:px-[32px] md:py-[10px] xl:px-[46px]">
      {weekDays.map((day, id) => {
        const isBlue = id >= 5;
        return (
          <li
            key={id}
            className={`w-[28px] text-center md:w-[50px] ${
              isBlue ? 'text-blue-500' : 'text-blackText dark:text-grayTheme'
            }`}
          >
            <p className="block text-center text-[16px] font-600 leading-[1.12] md:hidden md:text-[14px] md:leading-[1.28]">
              {format(day, 'EEEEE', { locale: dateFnsLocale })}
            </p>
            <p className="hidden text-center text-[16px] font-600 leading-[1.12] md:block md:text-[14px] md:leading-[1.28]">
              {format(day, 'EEE', { locale: dateFnsLocale })}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
