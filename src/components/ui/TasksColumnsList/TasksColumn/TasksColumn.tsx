'use client';

import { useState } from 'react';

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

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="cardBorder rounded-[8px] border-[1px] bg-white p-[18px] dark:bg-blackAccentBg md:p-[20px]">
      <ColumnHeadBar
        title={title}
        onOpen={handleToggleModal}
        className={tasks.length > 0 ? 'mb-[24px]' : 'mb-[35px]'}
      />

      {tasks && <ColumnsTasksList tasks={tasks} />}

      <AddTaskBtn onOpen={handleToggleModal} />

      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskForm
          selectedDate={selectedDate}
          category={title}
          // initialData={''}
          onClose={handleToggleModal}
        />
      </Modal>
    </div>
  );
};
