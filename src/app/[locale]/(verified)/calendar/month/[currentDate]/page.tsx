'use client';

import { useParams } from 'next/navigation';

export default function MonthCalendar() {
  const { currentDate } = useParams();

  return (
    <div>
      <h1>Календар місяця: {currentDate}</h1>
    </div>
  );
}
