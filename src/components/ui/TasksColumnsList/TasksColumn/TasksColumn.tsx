'use client';

import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { AddTaskBtn } from './AddTaskBtn/AddTaskBtn';
import { ColumnHeadBar } from './ColumnHeadBar/ColumnHeadBar';
import { ColumnsTasksList } from './ColumnsTasksList/ColumnsTasksList';
import { Modal } from '@/components/ui/Modal/Modal';
import { TaskForm } from '@/components/common/TaskForm/TaskForm';
import { ITask } from '@/store/tasksStore';

interface TasksColumnProps {
  title: 'To Do' | 'In Progress' | 'Done';
  selectedDate: string;
  tasks: ITask[];
}

export const TasksColumn = ({
  title,
  selectedDate,
  tasks,
}: TasksColumnProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasksListMaxHeight, setTasksListMaxHeight] = useState<string>('auto');
  const columnRef = useRef<HTMLDivElement | null>(null);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const columnEl = columnRef.current;

    const handleResize = () => {
      if (!columnEl) return;

      const rect = columnEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.top;
      const reserve = 150;
      const maxHeight = Math.max(spaceBelow - reserve, 150);
      setTasksListMaxHeight(`${maxHeight}px`);
    };

    const observer = new ResizeObserver(handleResize);
    if (columnEl) observer.observe(columnEl);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (columnEl) observer.unobserve(columnEl);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className="cardBorder rounded-[8px] border-[1px] bg-white p-[18px] dark:bg-blackAccentBg md:p-[20px]"
    >
      <ColumnHeadBar
        title={title}
        onOpen={handleToggleModal}
        className={tasks.length > 0 ? 'mb-[24px]' : 'mb-[35px]'}
      />

      {tasks && (
        <ColumnsTasksList tasks={tasks} maxHeight={tasksListMaxHeight} />
      )}

      <AddTaskBtn onOpen={handleToggleModal} />

      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskForm
          selectedDate={selectedDate}
          category={title}
          onClose={handleToggleModal}
        />
      </Modal>
    </div>
  );
};
