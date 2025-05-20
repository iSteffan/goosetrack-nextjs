'use client';

import { useState } from 'react';
import { addMonths, addDays, format, parse, isValid } from 'date-fns';
import { useLocale } from 'next-intl';
import { enGB, uk } from 'date-fns/locale';

import DatePicker from 'react-datepicker';

import ArrowLeftIcon from '@/public/icon/chevron-left.svg';
import ArrowRightIcon from '@/public/icon/chevron-right.svg';

interface PeriodPaginatorProps {
  periodType: 'day' | 'month';
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

const nominativeMonths = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
];

export const PeriodPaginator = ({
  periodType,
  selectedDate,
  onDateChange,
}: PeriodPaginatorProps) => {
  const locale = useLocale();
  const dateFnsLocale = locale === 'uk' ? uk : enGB;

  const [isOpen, setIsOpen] = useState(false);

  let dateToParse = selectedDate;
  if (periodType === 'month' && selectedDate.length === 7) {
    dateToParse = `${selectedDate}-01`;
  }

  const parsedDate = parse(dateToParse, 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDate)) {
    console.error('Invalid date:', selectedDate);
    return null;
  }

  const handleChange = (step: number) => {
    const newDate =
      periodType === 'month'
        ? addMonths(parsedDate, step)
        : addDays(parsedDate, step);

    onDateChange(format(newDate, 'yyyy-MM-dd'));
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      onDateChange(format(date, 'yyyy-MM-dd'));
      setIsOpen(false);
    }
  };

  const formattedDate =
    periodType === 'month'
      ? locale === 'uk'
        ? `${nominativeMonths[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`
        : format(parsedDate, 'MMMM yyyy', { locale: dateFnsLocale })
      : format(parsedDate, 'dd MMMM yyyy', { locale: dateFnsLocale });

  return (
    <div className="relative flex items-center justify-between md:w-[270px]">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-block rounded-[8px] bg-blueMain px-[12px] py-[6px] text-[14px] font-700 uppercase leading-[1.28] text-white"
      >
        {formattedDate}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[100%] z-10 mt-2">
          <DatePicker
            selected={parsedDate}
            onChange={handleDateSelect}
            inline
            locale={dateFnsLocale}
            dateFormat={periodType === 'month' ? 'MM/yyyy' : 'dd/MM/yyyy'}
            showMonthYearPicker={periodType === 'month'}
          />
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={() => handleChange(-1)}
          className="cardBorder rounded-l-[8px] border-[1px] bg-white px-[10px] py-[7px] dark:bg-blackAccentBg"
        >
          <ArrowLeftIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
        </button>
        <button
          type="button"
          onClick={() => handleChange(1)}
          className="cardBorder rounded-r-[8px] border-[1px] bg-white px-[10px] py-[7px] dark:bg-blackAccentBg"
        >
          <ArrowRightIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
        </button>
      </div>
    </div>
  );
};
