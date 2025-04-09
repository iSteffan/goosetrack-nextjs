import EditIcon from '@/public/icon/pencil.svg';
import DeleteIcon from '@/public/icon/deleteTask.svg';
import MoveIcon from '@/public/icon/moveTask.svg';

interface TaskToolbarProps {
  onOpen: () => void;
}

export const TaskToolbar = ({ onOpen }: TaskToolbarProps) => {
  return (
    <div className="flex items-end">
      <ul className="flex h-[14px] gap-[10px] md:h-[16px]">
        <li>
          <button type="button" className="group">
            <MoveIcon className="h-[14px] w-[14px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white md:h-[16px] md:w-[16px]" />
          </button>
        </li>
        <li>
          <button type="button" className="group" onClick={onOpen}>
            <EditIcon className="h-[14px] w-[14px] stroke-blackCustom group-hover:stroke-blueMain dark:stroke-white md:h-[16px] md:w-[16px]" />
          </button>
        </li>
        <li>
          <button type="button" className="group">
            <DeleteIcon className="h-[14px] w-[14px] stroke-blackCustom group-hover:stroke-blueMain dark:stroke-white md:h-[16px] md:w-[16px]" />
          </button>
        </li>
      </ul>
    </div>
  );
};
