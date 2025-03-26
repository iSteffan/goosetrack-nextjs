'use client';

import { useState } from 'react';

import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

// interface CalendarToolbarProps {
//   currentDate: string;
//   onPeriodChange: (newDate: string) => void;
// }

export const CalendarToolbar = () =>
  //     {
  //   currentDate,
  //   onPeriodChange,
  //     }: CalendarToolbarProps
  {
    const [periodType, setPeriodType] = useState<'day' | 'month'>('month');

    return (
      <div className="flex items-center justify-between p-4">
        <PeriodPaginator />
        <PeriodTypeSelect selectedType={periodType} onChange={setPeriodType} />
      </div>
    );
  };
