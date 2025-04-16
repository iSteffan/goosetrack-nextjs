'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  format,
} from 'date-fns';
import classNames from 'classnames';

import { useTasksStore } from '@/store/tasksStore';

interface CalendarTableProps {
  currentDate: string;
}

export const CalendarTable = ({ currentDate }: CalendarTableProps) => {
  const router = useRouter();
  const tasks = useTasksStore(state => state.tasks);

  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const start = startOfWeek(startOfMonth(new Date(currentDate)), {
    weekStartsOn: 1,
  });

  const end = endOfMonth(new Date(currentDate));
  const endOfCalendar = endOfWeek(end, { weekStartsOn: 1 });

  const selectedIso = format(new Date(currentDate), 'yyyy-MM-dd');

  const allDays = useMemo(() => {
    const days: Date[] = [];
    let current = start;
    while (current <= endOfCalendar) {
      days.push(current);
      current = addDays(current, 1);
    }
    return days;
  }, [start, endOfCalendar]);

  const getTasksForDay = (date: Date) => {
    const iso = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => task.date === iso);
  };

  const handleDayClick = (date: Date) => {
    const iso = format(date, 'yyyy-MM-dd');
    router.push(`/${locale}/calendar/day/${iso}`);
  };

  const getTaskClasses = (priority: 'Low' | 'Medium' | 'High') =>
    classNames('rounded-[8px] px-[4px] py-[2px]', {
      'bg-[#CEEEFD] text-radioLow': priority === 'Low',
      'bg-[#FCF0D4] text-radioMed': priority === 'Medium',
      'bg-[#FFD2DD] text-radioHigh': priority === 'High',
    });

  return (
    <div className="cardBorder grid grid-cols-7 rounded-[8px] border-[1px]">
      {allDays.map(day => {
        const iso = format(day, 'yyyy-MM-dd');
        const isCurrentMonth =
          day.getMonth() === new Date(currentDate).getMonth();
        const isSelected = iso === selectedIso;
        const tasksForDay = getTasksForDay(day);

        const cellStyles = classNames(
          'cardBorder h-[94px] cursor-pointer border-[1px] px-[4px] py-[4px]',
          {
            'bg-white dark:bg-blackAccentBg': isCurrentMonth,
            'bg-gray-50 dark:bg-blackPageBg': !isCurrentMonth,
          },
        );

        const dayStyles = classNames(
          'inline-block rounded-[6px] px-[6px] py-[2px] text-end text-[12px] font-700 leading-[1.12]]',
          {
            'bg-blueMain text-white': isSelected,
            'text-gray-400': !isCurrentMonth,
            'text-blackText dark:text-white': isCurrentMonth,
          },
        );

        return (
          <div
            key={iso}
            onClick={() => handleDayClick(day)}
            className={cellStyles}
          >
            <div className="flex justify-end">
              <p className={dayStyles}>{format(day, 'd')}</p>
            </div>

            {tasksForDay.length > 0 && (
              <ul className="mt-[4px] flex max-h-[58px] flex-col gap-[2px] overflow-y-auto">
                {tasksForDay.map(task => (
                  <li key={task._id}>
                    <div className={getTaskClasses(task.priority)}>
                      <p className="truncate text-[10px] font-700 leading-[1.4] dark:text-white">
                        {task.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};
