'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import EditIcon from '@/public/icon/pencil.svg';
import DeleteIcon from '@/public/icon/deleteTask.svg';
import MoveIcon from '@/public/icon/moveTask.svg';
import { deleteTaskById, updateTask } from '@/utils/getTask';
import { useTasksStore } from '@/store/tasksStore';

interface TaskToolbarProps {
  taskId: string;
  category: 'To Do' | 'In Progress' | 'Done';
  onOpen: () => void;
}

export const TaskToolbar = ({ onOpen, taskId, category }: TaskToolbarProps) => {
  const t = useTranslations('TaskToolbar');

  const { tasks, setTasks, deleteTask } = useTasksStore();
  const queryClient = useQueryClient();

  const { mutate: deleteTaskMutation, isPending } = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      deleteTask(taskId);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(t('taskDeleted'));
    },
    onError: error => {
      console.error('Failed to delete task', error);
      toast.error(t('deleteError'));
    },
  });

  const handleDelete = () => {
    if (confirm(t('confirm'))) {
      deleteTaskMutation(taskId);
    }
  };

  const categories: TaskToolbarProps['category'][] = [
    'To Do',
    'In Progress',
    'Done',
  ];

  const otherCategories = categories.filter(cat => cat !== category);

  const { mutate: moveTask, isPending: isMoving } = useMutation({
    mutationFn: (newCategory: TaskToolbarProps['category']) =>
      updateTask(taskId, { category: newCategory }),
    onSuccess: () => {
      setTasks(
        tasks.map(task => (task._id === taskId ? { ...task, category } : task)),
      );
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: error => console.error('Failed to move task', error),
  });

  return (
    <div className="flex items-end">
      <ul className="flex h-[14px] gap-[10px] md:h-[16px]">
        <li>
          <Menu>
            <MenuButton className="group">
              {isMoving ? (
                <div className="h-[14px] w-[14px] animate-spin rounded-full border-[2px] border-blueMain border-t-transparent" />
              ) : (
                <MoveIcon className="h-[14px] w-[14px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white md:h-[16px] md:w-[16px]" />
              )}
            </MenuButton>

            <MenuItems
              transition
              anchor="top end"
              className="z-10 flex origin-top-right flex-col gap-[14px] rounded-[8px] bg-white p-[14px] text-[12px] leading-[1.16] text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              {otherCategories.map(cat => (
                <MenuItem key={cat}>
                  <button
                    type="button"
                    onClick={() => moveTask(cat)}
                    disabled={isMoving}
                    className="group flex w-full items-center justify-between gap-[8px] transition-colors data-[focus]:text-blueMain"
                  >
                    {t(`categories.${cat}`)}

                    <MoveIcon className="h-[14px] w-[14px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white md:h-[16px] md:w-[16px]" />
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
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
