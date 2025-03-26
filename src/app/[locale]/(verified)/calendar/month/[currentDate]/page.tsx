'use client';

import {
  useParams,
  // useRouter
} from 'next/navigation';
import { CalendarToolbar } from '@/components/common/CalendarToolbar/CalendarToolbar';

const CalendarPage = () => {
  const { currentDate } = useParams();
  //   const router = useRouter();

  // Обробник зміни періоду
  //   const handlePeriodChange = (newDate: string) => {
  //     router.push(`/calendar/month/${newDate}`);
  //   };

  return (
    <section className="bg-grayBg dark:bg-blackPageBg">
      <div className="container pt-[40px]">
        <CalendarToolbar
        // currentDate={currentDate as string}
        // onPeriodChange={handlePeriodChange}
        />
        <div>Контент календаря для {currentDate}</div>
      </div>
    </section>
  );
};

export default CalendarPage;
