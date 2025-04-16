import { CalendarTable } from '@/components/ui/CalendarTable/CalendarTable';
import { MonthCalendarHead } from '@/components/ui/MonthCalendarHead/MonthCalendarHead';

interface ChoosedMonthProps {
  selectedDate: string;
}

export const ChoosedMonth = ({ selectedDate }: ChoosedMonthProps) => {
  return (
    <section>
      <MonthCalendarHead />
      <CalendarTable currentDate={selectedDate} />
    </section>
  );
};
