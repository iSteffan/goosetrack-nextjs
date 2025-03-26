'use client';

import { addMonths, format, parse } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/public/icon/chevron-left.svg';
import ArrowRightIcon from '@/public/icon/chevron-right.svg';

export const PeriodPaginator = () => {
  const { locale, currentDate } = useParams();
  const router = useRouter();

  if (typeof currentDate !== 'string') {
    return null;
  }

  const handleChange = (monthsToAdd: number) => {
    const newDate = format(
      addMonths(parse(currentDate, 'yyyy-MM', new Date()), monthsToAdd),
      'yyyy-MM',
    );

    router.push(`/${locale}/calendar/month/${newDate}`);
  };

  const formattedDate = format(
    parse(currentDate, 'yyyy-MM', new Date()),
    'MMMM yyyy',
  );

  return (
    <div className="flex items-center">
      <p className="inline-block rounded-[8px] bg-blueMain px-[12px] py-[6px] text-[14px] font-700 uppercase leading-[1.28] text-white">
        {formattedDate}
      </p>
      <button
        type="button"
        onClick={() => handleChange(-1)}
        className="dark:border-grayBorder rounded-l-[8px] border-[1px] border-inputBorder bg-white px-[10px] py-[7px] dark:bg-blackAccentBg"
      >
        <ArrowLeftIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
      </button>
      <button
        type="button"
        onClick={() => handleChange(1)}
        className="dark:border-grayBorder rounded-r-[8px] border-[1px] border-inputBorder bg-white px-[10px] py-[7px] dark:bg-blackAccentBg"
      >
        <ArrowRightIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
      </button>
    </div>
  );
};
