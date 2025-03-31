'use client';

import { addMonths, addDays, format, parse, isValid } from 'date-fns';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/public/icon/chevron-left.svg';
import ArrowRightIcon from '@/public/icon/chevron-right.svg';

interface PeriodPaginatorProps {
  periodType: 'day' | 'month';
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

export const PeriodPaginator = ({
  periodType,
  selectedDate,
  onDateChange,
}: PeriodPaginatorProps) => {
  const router = useRouter();

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
    let newDate;

    if (periodType === 'month') {
      newDate = addMonths(parsedDate, step);
    } else {
      newDate = addDays(parsedDate, step);
    }

    const formattedNewDate = format(newDate, 'yyyy-MM-dd');
    onDateChange(formattedNewDate);

    router.replace(`/uk/calendar/${periodType}/${formattedNewDate}`, {
      scroll: false,
    });
  };

  const formattedDate =
    periodType === 'month'
      ? format(parsedDate, 'MMMM yyyy')
      : format(parsedDate, 'dd MMMM yyyy');

  return (
    <div className="flex items-center justify-between md:w-[270px]">
      <p className="inline-block rounded-[8px] bg-blueMain px-[12px] py-[6px] text-[14px] font-700 uppercase leading-[1.28] text-white">
        {formattedDate}
      </p>

      <div>
        <button
          type="button"
          onClick={() => handleChange(-1)}
          className="rounded-l-[8px] border-[1px] border-inputBorder bg-white px-[10px] py-[7px] dark:border-grayBorder dark:bg-blackAccentBg"
        >
          <ArrowLeftIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
        </button>
        <button
          type="button"
          onClick={() => handleChange(1)}
          className="rounded-r-[8px] border-[1px] border-inputBorder bg-white px-[10px] py-[7px] dark:border-grayBorder dark:bg-blackAccentBg"
        >
          <ArrowRightIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
        </button>
      </div>
    </div>
  );
};
