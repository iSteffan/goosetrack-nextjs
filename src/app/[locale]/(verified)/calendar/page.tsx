'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { format } from 'date-fns';

export default function CalendarPage() {
  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    const currentDate = format(new Date(), 'yyyy-MM');
    router.replace(`/${locale}/calendar/month/${currentDate}`);
  }, [router, locale]);

  return null;
}
