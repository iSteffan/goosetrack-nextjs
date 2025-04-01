import PlusIcon from '@/public/icon/plus-circle.svg';
interface ColumnHeadBarProps {
  title: string;
}

export const ColumnHeadBar = ({ title }: ColumnHeadBarProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[18px] font-700 leading-[1.11] text-blackCustom dark:text-white">
        {title}
      </h2>
      <button type="button" className="group">
        <PlusIcon className="h-[22px] w-[22px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white" />
      </button>
    </div>
  );
};
