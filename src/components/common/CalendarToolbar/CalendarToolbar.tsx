// ---------------------------------------------------------------------------є проблема з пошуковим рядком
// 'use client';

// import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
// import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

// export const CalendarToolbar = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Отримуємо початковий periodType та дату з URL
//   const initialPeriodType =
//     (searchParams.get('type') as 'month' | 'day') || 'month';
//   const initialDate =
//     searchParams.get('date') || new Date().toISOString().split('T')[0];

//   const [periodType, setPeriodType] = useState<'month' | 'day'>(
//     initialPeriodType,
//   );

//   useEffect(() => {
//     router.replace(`${pathname}?type=${periodType}&date=${initialDate}`);
//   }, [periodType]);

//   return (
//     <div className="flex items-center justify-between">
//       <PeriodPaginator periodType={periodType} />
//       <PeriodTypeSelect periodType={periodType} onChange={setPeriodType} />
//     </div>
//   );
// };
//---------------------------------------------------------------------------------------------

'use client';

import {
  useParams,
  // useRouter
} from 'next/navigation';
import {
  useState,
  // useEffect
} from 'react';

import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

export const CalendarToolbar = () => {
  const params = useParams();

  const currentDate = params.currentDate as string;

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [periodType, setPeriodType] = useState<'day' | 'month'>('month');

  const handlePeriodChange = (type: 'day' | 'month') => {
    setPeriodType(type);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <PeriodPaginator
        periodType={periodType}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <PeriodTypeSelect
        selectedType={periodType}
        onChange={handlePeriodChange}
      />
    </div>
  );
};
