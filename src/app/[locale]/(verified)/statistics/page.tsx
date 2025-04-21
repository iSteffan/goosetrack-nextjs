'use client';

// import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

// import { IUser } from '@/store/userStore';
import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { useState } from 'react';
import { StatisticsChart } from '@/components/common/StatisticsChart/StatisticsChart';
import { useTasksStore } from '@/store/tasksStore';

// import { toast } from 'react-toastify';

export default function Page() {
  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<{ user: IUser }>(['user']);
  // console.log('data statistics', data);
  // const router = useRouter();

  // Перевіряємо, чи є дані перед рендером

  const periodType = 'day';
  const initialDate = format(new Date(), 'yyyy-MM-dd');

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const { tasks, isLoading } = useTasksStore(state => state);

  if (isLoading) {
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
