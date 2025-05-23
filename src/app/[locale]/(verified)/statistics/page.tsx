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
      <div className="container pt-[40px] xl:px-[32px]">
        <div className="rounded-[16px] bg-white px-[14px] py-[28px] md:px-[32px] md:py-[60px] xl:px-[114px] xl:py-[100px]">
          <div className="mb-[40px] flex flex-col gap-[20px] md:flex-row md:justify-between">
            <PeriodPaginator
              periodType={periodType}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            <div className="flex gap-[14px] text-[#111111]">
              <div className="flex items-center gap-[6px]">
                <span className="h-[10px] w-[10px] rounded-full bg-[#FFD2DD]" />
                <p className="text-[14px] font-400 leading-[1.28] md:text-[16px] md:leading-[1.12]">
                  By Day
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="h-[10px] w-[10px] rounded-full bg-blueMain" />
                <p className="text-[14px] font-400 leading-[1.28] md:text-[16px] md:leading-[1.12]">
                  By Month
                </p>
              </div>
            </div>
          </div>

          <StatisticsChart selectedDate={selectedDate} tasks={tasks} />
        </div>
      </div>
    </section>
  );
}
