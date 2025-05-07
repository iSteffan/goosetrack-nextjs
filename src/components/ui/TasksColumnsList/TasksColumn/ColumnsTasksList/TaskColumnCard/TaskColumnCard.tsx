import { useState } from 'react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { TaskToolbar } from './TaskToolbar/TaskToolbar';
import { Modal } from '@/components/ui/Modal/Modal';
import { TaskForm } from '@/components/common/TaskForm/TaskForm';
import { useUserStore } from '@/store/userStore';
import { ITask } from '@/store/tasksStore';
import { Avatar } from '@/components/ui/Avatar/Avatar';

interface TaskColumnCardProps {
  task: ITask;
}

export const TaskColumnCard = ({ task }: TaskColumnCardProps) => {
  const t = useTranslations('TaskColumnCard');
  const { user } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // console.log('task', task);

  let taskPriority: string;

  if (task.priority === 'Low') {
    taskPriority = t('low');
  } else if (task.priority === 'Medium') {
    taskPriority = t('medium');
  } else {
    taskPriority = t('high');
  }

  const priorityStyles = classNames(
    'inline-block h-[20px] rounded-[4px] px-[12px] py-[4px] text-[10px] font-600 leading-[1.2] text-white',
    {
      'bg-radioLow': task?.priority === 'Low',
      'bg-radioMed': task?.priority === 'Medium',
      'bg-radioHigh': task?.priority === 'High',
    },
  );

  if (!task) {
    return null;
  }

  return (
    <div className="rounded-[8px] border-[1px] border-taskCardBorder bg-grayBg px-[14px] pb-[18px] pt-[14px] dark:border-darkThemeBorder dark:bg-blackLightBg">
      <p className="mb-[28px] block overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[1.28] text-blackCustom dark:text-white">
        {task?.title}
      </p>

      <div className="flex justify-between">
        <div className="flex items-end gap-[8px]">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
            <Avatar avatarURL={user?.avatarURL} name={user?.name} size={32} />
          </div>

          <p className={priorityStyles}>{taskPriority}</p>
        </div>

        <TaskToolbar
          onOpen={handleToggleModal}
          taskId={task._id}
          category={task.category}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskForm
          selectedDate={task.date}
          category={task.category}
          initialData={task}
          onClose={handleToggleModal}
        />
      </Modal>
    </div>
  );
};
