'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { CalendarToolbar } from '@/components/common/CalendarToolbar/CalendarToolbar';

export default function CalendarPage() {
  const router = useRouter();
  const { params = [], locale } = useParams(); 

  useEffect(() => {
    if (params.length === 0) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      router.replace(`/${locale}/calendar/month/${currentDate}`);
    }
  }, [params, locale, router]);

  const periodType = params[0] === 'day' ? 'day' : 'month';
  const currentDate = params[1] || format(new Date(), 'yyyy-MM');

  return (
    <section className="bg-grayBg dark:bg-blackPageBg">
      <div className="container pt-[40px]">
        <CalendarToolbar currentDate={currentDate} periodType={periodType} />
        <div>
          Контент календаря для {currentDate} ({periodType})
        </div>
      </div>
    </section>
  );
}
