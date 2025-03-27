// ---------------------------------------------------------------------------є проблема з пошуковим рядком

// import ArrowLeftIcon from '@/public/icon/chevron-left.svg';
// import ArrowRightIcon from '@/public/icon/chevron-right.svg';

// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { format, addMonths, addDays, parseISO } from 'date-fns';

// interface PeriodPaginatorProps {
//   periodType: 'month' | 'day';
// }

// export const PeriodPaginator = ({ periodType }: PeriodPaginatorProps) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Отримуємо поточну дату з URL або встановлюємо сьогоднішню
//   const currentDate =
//     searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');

//   const handleChange = (step: number) => {
//     let newDate;
//     if (periodType === 'month') {
//       newDate = addMonths(parseISO(currentDate), step);
//     } else {
//       newDate = addDays(parseISO(currentDate), step);
//     }

//     const formattedDate = format(newDate, 'yyyy-MM-dd');
//     router.push(`${pathname}?date=${formattedDate}`);
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <button
//         type="button"
//         onClick={() => handleChange(-1)}
//         className="rounded-l-[8px] border-[1px] border-inputBorder bg-white px-[10px] py-[7px] dark:border-grayBorder dark:bg-blackAccentBg"
//       >
//         <ArrowLeftIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
//       </button>

//       <span className="text-lg font-semibold">
//         {format(
//           parseISO(currentDate),
//           periodType === 'month' ? 'MMMM yyyy' : 'dd MMMM yyyy',
//         )}
//       </span>

//       <button
//         type="button"
//         onClick={() => handleChange(1)}
//         className="rounded-r-[8px] border-[1px] border-inputBorder bg-white px-[10px] py-[7px] dark:border-grayBorder dark:bg-blackAccentBg"
//       >
//         <ArrowRightIcon className="h-[16px] w-[16px] stroke-black dark:stroke-white" />
//       </button>
//     </div>
//   );
// };
// --------------------------------------------------------------------------------------------

'use client';

import { addMonths, addDays, format, parse } from 'date-fns';
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

  const handleChange = (step: number) => {
    const parsedDate = parse(selectedDate, 'yyyy-MM-dd', new Date());
    let newDate;

    if (periodType === 'month') {
      newDate = addMonths(parsedDate, step);
    } else {
      newDate = addDays(parsedDate, step);
    }

    const formattedNewDate = format(newDate, 'yyyy-MM-dd');
    onDateChange(formattedNewDate);

    // Оновлюємо ТІЛЬКИ дату в маршруті, нічого зайвого
    router.replace(`/uk/calendar/month/${formattedNewDate}`, {
      scroll: false,
    });
  };

  const formattedDate =
    periodType === 'month'
      ? format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'MMMM yyyy') // Month View: June 2025
      : format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'dd MMMM yyyy'); // Day View: 30 June 2025

  return (
    <div className="flex items-center">
      <p className="inline-block rounded-[8px] bg-blueMain px-[12px] py-[6px] text-[14px] font-700 uppercase leading-[1.28] text-white">
        {formattedDate}
      </p>
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
  );
};
