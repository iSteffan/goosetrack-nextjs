'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
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
import { Modal } from '../Modal/Modal';
import { TaskForm } from '@/components/common/TaskForm/TaskForm';

interface CalendarTableProps {
  currentDate: string;
}

export const CalendarTable = ({ currentDate }: CalendarTableProps) => {
  const router = useRouter();

  const { tasks, isTaskLoading } = useTasksStore(state => state);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

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
    classNames(
      'rounded-[8px] px-[4px] py-[2px] w-full transform transition-transform hover:scale-90',
      {
        'bg-[#CEEEFD] text-radioLow': priority === 'Low',
        'bg-[#FCF0D4] text-radioMed': priority === 'Medium',
        'bg-[#FFD2DD] text-radioHigh': priority === 'High',
      },
    );

  return (
    <div className="relative">
      <div className="cardBorder grid grid-cols-7 rounded-[8px] border-[1px]">
        {allDays.map((day, index) => {
          const iso = format(day, 'yyyy-MM-dd');
          const isCurrentMonth =
            day.getMonth() === new Date(currentDate).getMonth();
          const isSelected = iso === selectedIso;
          const tasksForDay = getTasksForDay(day);

          const isFirstRow = index < 7;
          const isLastRow = index >= allDays.length - 7;
          const isFirstCol = index % 7 === 0;
          const isLastCol = index % 7 === 6;

          const cellStyles = classNames(
            'h-[94px] outline outline-[1px] dark:outline-darkThemeBorder outline-inputBorder px-[4px] py-[8px] md:h-[144px] xl:h-[125px]',
            {
              'bg-white dark:bg-blackAccentBg': isCurrentMonth,
              'bg-gray-50 dark:bg-blackPageBg': !isCurrentMonth,
              'rounded-tl-[8px]': isFirstRow && isFirstCol,
              'rounded-tr-[8px]': isFirstRow && isLastCol,
              'rounded-bl-[8px]': isLastRow && isFirstCol,
              'rounded-br-[8px]': isLastRow && isLastCol,
            },
          );

          const dayStyles = classNames(
            'inline-block rounded-[6px] px-[6px] py-[2px] text-end text-[12px] font-700 leading-[1.12] md:text-[16px] md:py-[4px] md:px-[8px]',
            {
              'bg-blueMain text-white': isSelected,
              'text-gray-400': !isCurrentMonth,
              'text-blackText dark:text-white': isCurrentMonth,
            },
          );

          return (
            <div
              key={iso}
              className={cellStyles}
              style={{ borderCollapse: 'collapse' }}
            >
              <button
                type="button"
                className="ml-auto flex transform justify-end transition-transform hover:scale-125"
                onClick={() => handleDayClick(day)}
              >
                <p className={dayStyles}>{format(day, 'd')}</p>
              </button>

              {tasksForDay.length > 0 && (
                <ul className="mt-[4px] flex max-h-[58px] flex-col gap-[4px] overflow-y-auto md:max-h-[100px] md:gap-[8px] xl:max-h-[78px]">
                  {tasksForDay.map(task => (
                    <li key={task._id}>
                      <button
                        type="button"
                        className={getTaskClasses(task.priority)}
                        onClick={e => {
                          e.stopPropagation();
                          setActiveTaskId(task._id);
                        }}
                      >
                        <p className="truncate text-[10px] font-700 leading-[1.4] md:text-[14px] md:leading-[1.28]">
                          {task.title}
                        </p>
                      </button>

                      {activeTaskId === task._id && (
                        <Modal isOpen onClose={() => setActiveTaskId(null)}>
                          <TaskForm
                            selectedDate={task.date}
                            category={task.category}
                            initialData={task}
                            onClose={() => setActiveTaskId(null)}
                          />
                        </Modal>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {isTaskLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[8px] bg-white/80 backdrop-blur-sm dark:bg-black/70">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blueMain border-t-transparent" />
        </div>
      )}
    </div>
  );
};
