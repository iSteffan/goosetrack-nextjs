// 'use client';

// import { useMemo } from 'react';
// import { addDays, startOfWeek, parse } from 'date-fns';
// import { DayCalendarHead } from '@/components/ui/DayCalendarHead/DayCalendarHead';

// export const ChoosedDay = ({
//   selectedDate,
//   onDateChange,
// }: {
//   selectedDate: string;
//   onDateChange: (newDate: string) => void;
// }) => {
//   // Початок тижня (з понеділка)
//   const weekStart = useMemo(
//     () =>
//       startOfWeek(parse(selectedDate, 'yyyy-MM-dd', new Date()), {
//         weekStartsOn: 1,
//       }),
//     [selectedDate],
//   );

//   // Масив днів тижня
//   const weekDays = useMemo(
//     () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
//     [weekStart],
//   );

//   return (
//     <DayCalendarHead
//       weekDays={weekDays}
//       selectedDate={selectedDate}
//       onDateChange={onDateChange}
//     />
//   );
// };

'use client';

import { startOfWeek, addDays, parse } from 'date-fns';
import { DayCalendarHead } from '@/components/ui/DayCalendarHead/DayCalendarHead';
import { TasksColumnsList } from '@/components/ui/TasksColumnsList/TasksColumnsList';

export const ChoosedDay = ({
  selectedDate,
  onDateChange,
}: {
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}) => {
  const weekStart = startOfWeek(parse(selectedDate, 'yyyy-MM-dd', new Date()), {
    weekStartsOn: 1,
  });
  //   console.log('weekStart', weekStart);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  //   console.log('weekDays', weekDays);
  return (
    <>
      <DayCalendarHead
        weekDays={weekDays}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />
      <TasksColumnsList />
    </>
  );
};
