'use client';

import { useTranslations } from 'next-intl';

interface PeriodTypeSelectProps {
  periodType: 'day' | 'month';
  onChange: (type: 'day' | 'month') => void;
}

export const PeriodTypeSelect = ({
  periodType,
  onChange,
}: PeriodTypeSelectProps) => {
  const t = useTranslations('PeriodTypeSelect');

  return (
    <div className="flex">
      <button
        className={`w-[76px] rounded-l-[8px] py-[8px] text-[14px] leading-[1.28] dark:text-white ${periodType === 'month' ? 'bg-[#CAE8FF] text-blueMain dark:bg-blueMain' : 'bg-bluePale dark:bg-blackAccentBg'}`}
        onClick={() => onChange('month')}
      >
        {t('month')}
      </button>

      <button
        className={`w-[76px] rounded-r-[8px] py-[8px] text-[14px] leading-[1.28] dark:text-white ${periodType === 'day' ? 'bg-[#CAE8FF] text-blueMain dark:bg-blueMain' : 'bg-bluePale dark:bg-blackAccentBg'}`}
        onClick={() => onChange('day')}
      >
        {t('day')}
      </button>
    </div>
  );
};
