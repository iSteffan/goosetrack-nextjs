'use client';

import { useParams } from 'next/navigation';
import { CalendarToolbar } from '@/components/common/CalendarToolbar/CalendarToolbar';

const CalendarPage = () => {
  const { currentDate } = useParams();

  return (
    <section className="bg-grayBg dark:bg-blackPageBg">
      <div className="container pt-[40px]">
        <CalendarToolbar />
        <div>Контент календаря для {currentDate}</div>
      </div>
    </section>
  );
};

export default CalendarPage;
