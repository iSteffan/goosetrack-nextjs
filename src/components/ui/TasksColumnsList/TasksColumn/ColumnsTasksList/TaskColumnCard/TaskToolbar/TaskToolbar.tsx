import { useMutation, useQueryClient } from '@tanstack/react-query';

import EditIcon from '@/public/icon/pencil.svg';
import DeleteIcon from '@/public/icon/deleteTask.svg';
import MoveIcon from '@/public/icon/moveTask.svg';
import { deleteTaskById } from '@/utils/getTask';

interface TaskToolbarProps {
  taskId: string;
  onOpen: () => void;
}

export const TaskToolbar = ({ onOpen, taskId }: TaskToolbarProps) => {
  const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: deleteTaskById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: error => {
        console.error('Failed to delete task', error);
      },
    });
  };

  const { mutate: deleteTask, isPending } = useDeleteTask();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

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
          <button
            type="button"
            className="group"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <div className="h-[14px] w-[14px] animate-spin rounded-full border-[2px] border-blueMain border-t-transparent" />
            ) : (
              <DeleteIcon className="h-[14px] w-[14px] stroke-blackCustom group-hover:stroke-blueMain dark:stroke-white md:h-[16px] md:w-[16px]" />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};
