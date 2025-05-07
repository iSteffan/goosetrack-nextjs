'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { StatisticsChart } from '@/components/common/StatisticsChart/StatisticsChart';
import { useTasksStore } from '@/store/tasksStore';

export default function Page() {
  const periodType = 'day';
  const initialDate = format(new Date(), 'yyyy-MM-dd');

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const { tasks, isTaskLoading } = useTasksStore(state => state);

  if (isTaskLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <div className="container pt-[40px]">
        <PeriodPaginator
          periodType={periodType}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <StatisticsChart selectedDate={selectedDate} tasks={tasks} />
      </div>
    </section>
  );
}
