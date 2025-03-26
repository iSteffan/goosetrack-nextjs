'use client';

interface PeriodTypeSelectProps {
  selectedType: 'day' | 'month';
  onChange: (type: 'day' | 'month') => void;
}

export const PeriodTypeSelect = ({
  selectedType,
  onChange,
}: PeriodTypeSelectProps) => {
  return (
    <div className="flex">
      <button
        className={`w-[76px] rounded-l-[8px] py-[8px] text-[14px] leading-[1.28] text-blueMain ${selectedType === 'month' ? 'bg-[#CAE8FF]' : 'bg-bluePale'}`}
        onClick={() => onChange('month')}
      >
        Month
      </button>

      <button
        className={`w-[76px] rounded-r-[8px] py-[8px] text-[14px] leading-[1.28] text-blueMain ${selectedType === 'day' ? 'bg-[#CAE8FF]' : 'bg-bluePale'}`}
        onClick={() => onChange('day')}
      >
        Day
      </button>
    </div>
  );
};
