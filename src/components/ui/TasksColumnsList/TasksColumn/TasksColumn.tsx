'use client';

import { useState } from 'react';

import { AddTaskBtn } from './AddTaskBtn/AddTaskBtn';
import { ColumnHeadBar } from './ColumnHeadBar/ColumnHeadBar';
import { ColumnsTasksList } from './ColumnsTasksList/ColumnsTasksList';
import { Modal } from '@/components/ui/Modal/Modal';
import { TaskForm } from '@/components/common/TaskForm/TaskForm';

export const TasksColumn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      TasksColumn
      <ColumnHeadBar title="To Do" onOpen={handleToggleModal} />
      <ColumnsTasksList />
      <AddTaskBtn onOpen={handleToggleModal} />
      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskForm />
      </Modal>
    </div>
  );
};
