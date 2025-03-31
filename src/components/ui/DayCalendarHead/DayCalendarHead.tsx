// 'use client';

// import { format, isSameDay } from 'date-fns';

// interface DayCalendarHeadProps {
//   weekDays: Date[];
//   selectedDate: string;
//   onDateChange: (date: string) => void;
// }

// export const DayCalendarHead = ({
//   weekDays,
//   selectedDate,
//   onDateChange,
// }: DayCalendarHeadProps) => {
//   console.log('weekDays', weekDays);
//   return (
//     <div className="flex justify-between rounded-md bg-gray-100 p-2">
//       {weekDays.map(day => {
//         const formattedDate = format(day, 'yyyy-MM-dd');
//         console.log('formattedDate', formattedDate);

//         const isActive = isSameDay(day, new Date(selectedDate));

//         return (
//           <button
//             type="button"
//             key={formattedDate}
//             onClick={() => onDateChange(formattedDate)}
//             className={`rounded-md px-3 py-2 text-sm ${
//               isActive
//                 ? 'bg-blue-500 font-bold text-white'
//                 : 'bg-white text-black'
//             }`}
//           >
//             <div className="text-xs uppercase">{format(day, 'EEE')}</div>
//             <div>{format(day, 'd')}</div>
//           </button>
//         );
//       })}
//     </div>
//   );
// };

'use client';

import { format, isSameDay } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

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
  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });
  return (
    <ul className="cardBorder flex justify-between rounded-[8px] border-[1px] bg-white px-[18px] py-[14px] dark:bg-blackAccentBg">
      {weekDays.map((day, id) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const isActive = isSameDay(day, new Date(selectedDate));

        return (
          <li key={id}>
            <p className="mb-[6px] block text-center text-[16px] font-600 uppercase leading-[1.12] text-blackText dark:text-grayTheme">
              {/* {format(day, 'EEEEE')} */}
              {isTablet ? format(day, 'E') : format(day, 'EEEEE')}
            </p>

            <button
              type="button"
              key={formattedDate}
              onClick={() => onDateChange(formattedDate)}
              className={`rounded-[6px] px-[6px] py-[4px] text-[12px] font-700 leading-[1.16] ${
                isActive
                  ? 'bg-blueMain font-bold text-white'
                  : 'text-blackText dark:text-white'
              }`}
            >
              {/* <div className="lg:text-xs text-xs uppercase sm:text-base md:text-sm">
              {format(day, 'E')}
            </div> */}

              <p>{format(day, 'd')}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
