'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { CalendarToolbar } from '@/components/common/CalendarToolbar/CalendarToolbar';
import { ChoosedDay } from '@/components/common/ChoosedDay/ChoosedDay';
import { ChoosedMonth } from '@/components/common/ChoosedMonth/ChoosedMonth';

export default function CalendarPage() {
  const router = useRouter();
  const { params = [], locale } = useParams();

  const initialPeriodType = params[0] === 'day' ? 'day' : 'month';
  const initialDate = params[1] || format(new Date(), 'yyyy-MM-dd');

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [periodType, setPeriodType] = useState<'day' | 'month'>(
    initialPeriodType,
  );

  useEffect(() => {
    if (params.length === 0) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      router.replace(`/${locale}/calendar/month/${currentDate}`);
    }
  }, [params, locale, router]);

  useEffect(() => {
    router.replace(`/${locale}/calendar/${periodType}/${selectedDate}`, {
      scroll: false,
    });
  }, [periodType, selectedDate, locale, router]);

  return (
    <section className="pt-[40px] xl:pt-[16px]">
      <div className="container xl:px-[32px]">
        <CalendarToolbar
          currentDate={selectedDate}
          periodType={periodType}
          onDateChange={setSelectedDate}
          onPeriodChange={setPeriodType}
        />

        <div>
          {periodType === 'day' ? (
            <ChoosedDay
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          ) : (
            <ChoosedMonth selectedDate={selectedDate} />
          )}
        </div>
      </div>
    </section>
  );
}
