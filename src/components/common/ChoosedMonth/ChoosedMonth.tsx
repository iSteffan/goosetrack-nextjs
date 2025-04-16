import { CalendarTable } from '@/components/ui/CalendarTable/CalendarTable';
import { MonthCalendarHead } from '@/components/ui/MonthCalendarHead/MonthCalendarHead';

export const ChoosedMonth = () => {
  return (
    <section>
      <MonthCalendarHead />
      <CalendarTable />
    </section>
  );
};
