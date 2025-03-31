// 'use client';

// import { useState } from 'react';
// import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
// import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

// export const CalendarToolbar = ({
//   currentDate,
//   periodType,
// }: {
//   currentDate: string;
//   periodType: 'day' | 'month';
// }) => {
//   const [selectedDate, setSelectedDate] = useState(currentDate);
//   const [period, setPeriod] = useState(periodType);

//   const handlePeriodChange = (type: 'day' | 'month') => {
//     setPeriod(type);
//   };

//   return (
// <div className="flex flex-col justify-between gap-[18px] p-4 md:flex-row md:items-center">
//       <PeriodPaginator
//         periodType={period}
//         selectedDate={selectedDate}
//         onDateChange={setSelectedDate}
//       />
//       <PeriodTypeSelect periodType={period} onChange={handlePeriodChange} />
//     </div>
//   );
// };

'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PeriodPaginator } from '@/components/ui/PeriodPaginator/PeriodPaginator';
import { PeriodTypeSelect } from '@/components/ui/PeriodTypeSelect/PeriodTypeSelect';

export const CalendarToolbar = ({
  currentDate,
  periodType,
}: {
  currentDate: string;
  periodType: 'day' | 'month';
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [period, setPeriod] = useState(periodType);

  const handlePeriodChange = (type: 'day' | 'month') => {
    setPeriod(type);

    router.replace(`/${locale}/calendar/${type}/${selectedDate}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    router.replace(`/${locale}/calendar/${period}/${selectedDate}`, {
      scroll: false,
    });
  }, [selectedDate, period, router, locale]);

  return (
    <div className="flex flex-col justify-between gap-[18px] p-4 md:flex-row md:items-center">
      <PeriodPaginator
        periodType={period}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <PeriodTypeSelect periodType={period} onChange={handlePeriodChange} />
    </div>
  );
};
