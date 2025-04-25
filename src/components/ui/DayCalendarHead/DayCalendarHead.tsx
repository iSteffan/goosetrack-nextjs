'use client';

import { format, isSameDay } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { useLocale } from 'next-intl';

interface DayCalendarHeadProps {
  weekDays: Date[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DayCalendarHead = ({
  weekDays,
  selectedDate,
  onDateChange,
}: DayCalendarHeadProps) => {
  const localeCode = useLocale();
  const dateFnsLocale = localeCode === 'uk' ? uk : enUS;

  return (
    <ul className="cardBorder mb-[14px] flex justify-between rounded-[8px] border-[1px] bg-white px-[18px] py-[14px] dark:bg-blackAccentBg md:mb-[16px] md:px-[32px] md:py-[10px] xl:px-[46px]">
      {weekDays.map((day, id) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const isActive = isSameDay(day, new Date(selectedDate));

        return (
          <li key={id} className="w-[28px] text-center md:w-[50px]">
            <p className="mb-[6px] block text-center text-[16px] font-600 uppercase leading-[1.12] text-blackText dark:text-grayTheme md:mb-[4px] md:hidden md:text-[14px] md:leading-[1.28]">
              {format(day, 'EEEEE', { locale: dateFnsLocale })}
            </p>

            <p className="mb-[6px] hidden text-center text-[16px] font-600 uppercase leading-[1.12] text-blackText dark:text-grayTheme md:mb-[4px] md:block md:text-[14px] md:leading-[1.28]">
              {format(day, 'E', { locale: dateFnsLocale })}
            </p>

            <button
              type="button"
              key={formattedDate}
              onClick={() => onDateChange(formattedDate)}
              className={`rounded-[6px] px-[6px] py-[4px] text-[12px] font-700 leading-[1.16] md:text-[16px] md:leading-[1.12] ${
                isActive
                  ? 'bg-blueMain font-bold text-white'
                  : 'text-blackText dark:text-white'
              }`}
            >
              <p>{format(day, 'd')}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
