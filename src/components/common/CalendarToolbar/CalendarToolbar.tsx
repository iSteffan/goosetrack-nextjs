'use client';

import { useState } from 'react';
import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

export const CalendarToolbar = ({
  currentDate,
  periodType,
}: {
  currentDate: string;
  periodType: 'day' | 'month';
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [period, setPeriod] = useState(periodType);

  const handlePeriodChange = (type: 'day' | 'month') => {
    setPeriod(type);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <PeriodPaginator
        periodType={period}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <PeriodTypeSelect periodType={period} onChange={handlePeriodChange} />
    </div>
  );
};
