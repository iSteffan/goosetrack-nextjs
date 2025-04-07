'use client';

import { startOfWeek, addDays, parse } from 'date-fns';
import { DayCalendarHead } from '@/components/ui/DayCalendarHead/DayCalendarHead';
import { TasksColumnsList } from '@/components/ui/TasksColumnsList/TasksColumnsList';

interface ChoosedDayProps {
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

export const ChoosedDay = ({ selectedDate, onDateChange }: ChoosedDayProps) => {
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
      <p>Контент календаря для {selectedDate}</p>
      <TasksColumnsList selectedDate={selectedDate} />
    </>
  );
};
