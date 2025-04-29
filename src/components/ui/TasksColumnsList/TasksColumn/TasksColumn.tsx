// 'use client';

// import { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';

// import { AddTaskBtn } from './AddTaskBtn/AddTaskBtn';
// import { ColumnHeadBar } from './ColumnHeadBar/ColumnHeadBar';
// import { ColumnsTasksList } from './ColumnsTasksList/ColumnsTasksList';
// import { Modal } from '@/components/ui/Modal/Modal';
// import { TaskForm } from '@/components/common/TaskForm/TaskForm';
// import { ITask } from '@/store/tasksStore';

// interface TasksColumnProps {
//   title: 'To Do' | 'In Progress' | 'Done';
//   selectedDate: string;
//   tasks: ITask[];
// }

// export const TasksColumn = ({
//   title,
//   selectedDate,
//   tasks,
// }: TasksColumnProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { ref, inView } = useInView({
//     triggerOnce: true, // Відслідковуємо лише перше входження у вьюпорт
//     threshold: 0, // 50% елемента має бути видно
//   });

//   const [heightAdjustment, setHeightAdjustment] = useState(false);

//   useEffect(() => {
//     // Зміна висоти тільки тоді, коли компонент стає невидимим
//     if (!inView) {
//       setHeightAdjustment(true);
//     } else {
//       setHeightAdjustment(false);
//     }
//   }, [inView]);

//   const handleToggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <div
//       ref={ref}
//       className="cardBorder rounded-[8px] border-[1px] bg-white p-[18px] dark:bg-blackAccentBg md:p-[20px]"
//     >
//       <ColumnHeadBar
//         title={title}
//         onOpen={handleToggleModal}
//         className={tasks.length > 0 ? 'mb-[24px]' : 'mb-[35px]'}
//       />

//       {tasks && (
//         <ColumnsTasksList
//           maxHeight={heightAdjustment ? '200px' : 'auto'} // Задаємо висоту в залежності від видимості
//           tasks={tasks}
//         />
//       )}

//       <AddTaskBtn onOpen={handleToggleModal} />

//       <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
//         <TaskForm
//           selectedDate={selectedDate}
//           category={title}
//           onClose={handleToggleModal}
//         />
//       </Modal>
//     </div>
//   );
// };

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
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
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const columnRef = useRef<HTMLDivElement | null>(null);

  const [columnHeight, setColumnHeight] = useState<number>(0);
  const [tasksListMaxHeight, setTasksListMaxHeight] = useState<string>('auto');

  const mergedRef = (node: HTMLDivElement | null) => {
    ref(node);
    columnRef.current = node;
  };

  const updateHeight = () => {
    if (columnRef.current) {
      setColumnHeight(columnRef.current.getBoundingClientRect().height);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    if (!inView) {
      const availableHeight = window.innerHeight - columnHeight;
      setTasksListMaxHeight(`${availableHeight - 50}px`);
    } else {
      setTasksListMaxHeight('auto');
    }
  }, [inView, columnHeight]);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      ref={mergedRef}
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
