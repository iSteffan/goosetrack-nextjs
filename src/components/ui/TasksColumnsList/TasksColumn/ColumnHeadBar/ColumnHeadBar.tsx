import { useTranslations } from 'next-intl';

import PlusIcon from '@/public/icon/plus-circle.svg';

interface ColumnHeadBarProps {
  title: string;
  onOpen: () => void;
  className?: string;
}

export const ColumnHeadBar = ({
  title,
  onOpen,
  className = '',
}: ColumnHeadBarProps) => {
  const t = useTranslations('ColumnHeadBar');

  let titleName: string;

  if (title === 'To Do') {
    titleName = t('toDo');
  } else if (title === 'In Progress') {
    titleName = t('inProgress');
  } else {
    titleName = t('done');
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="text-[18px] font-700 leading-[1.11] text-blackCustom dark:text-white md:text-[20px] md:leading-[1.2]">
        {titleName}
      </h2>
      <button type="button" className="group" onClick={onOpen}>
        <PlusIcon className="h-[22px] w-[22px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white md:h-[24px] md:w-[24px]" />
      </button>
    </div>
  );
};
