import { useTranslations } from 'next-intl';

import PlusIcon from '@/public/icon/plus.svg';

interface AddTaskBtnProps {
  onOpen: () => void;
}

export const AddTaskBtn = ({ onOpen }: AddTaskBtnProps) => {
  const t = useTranslations('AddTaskBtn');

  return (
    <button
      type="button"
      onClick={onOpen}
      className="btnEffect group flex w-full items-center justify-center gap-[8px] rounded-[8px] border-[1px] border-dashed border-blueMain bg-bluePale py-[12px] dark:bg-blueMain dark:hover:bg-blueAccent"
    >
      <PlusIcon className="h-[24px] w-[24px] stroke-blackCustom group-hover:stroke-white group-focus:stroke-white dark:stroke-white" />
      <span className="text-[14px] font-600 leading-[1.28] text-blackCustom group-hover:text-white group-focus:text-white dark:text-white">
        {t('add')}
      </span>
    </button>
  );
};
