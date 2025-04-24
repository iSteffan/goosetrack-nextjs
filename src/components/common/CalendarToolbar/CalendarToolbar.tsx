'use client';

import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

interface CalendarToolbarProps {
  currentDate: string;
  periodType: 'day' | 'month';
  onDateChange: (newDate: string) => void;
  onPeriodChange: (type: 'day' | 'month') => void;
}

export const CalendarToolbar = ({
  currentDate,
  periodType,
  onDateChange,
  onPeriodChange,
}: CalendarToolbarProps) => {
  return (
    <div className="mb-[24px] flex flex-col justify-between gap-[18px] md:mb-[32px] md:flex-row md:items-center">
      <PeriodPaginator
        periodType={periodType}
        selectedDate={currentDate}
        onDateChange={onDateChange}
      />
      <PeriodTypeSelect periodType={periodType} onChange={onPeriodChange} />
    </div>
  );
};
