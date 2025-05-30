import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type PeriodType = 'day' | 'month';

interface CalendarState {
  selectedDate: string;
  periodType: PeriodType;
  setSelectedDate: (date: string) => void;
  setPeriodType: (type: PeriodType) => void;
}

export const useCalendarStore = create<CalendarState>()(
  devtools(
    set => ({
      selectedDate: '',
      periodType: 'month',
      setSelectedDate: date => set({ selectedDate: date }),
      setPeriodType: type => set({ periodType: type }),
    }),
    { name: 'calendar-store' },
  ),
);
