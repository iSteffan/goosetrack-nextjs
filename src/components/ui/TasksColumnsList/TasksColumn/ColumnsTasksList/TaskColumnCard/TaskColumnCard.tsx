import Image from 'next/image';
// import { useState, useEffect } from 'react';
import {
  // useIsFetching,
  // useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { IUser } from '@/components/common/UserForm/UserForm';
import { Task } from '../../../TasksColumnsList';
import { TaskToolbar } from './TaskToolbar/TaskToolbar';

interface TaskColumnCardProps {
  task: Task;
}

export const TaskColumnCard = ({ task }: TaskColumnCardProps) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ user: IUser }>(['user']);
  // const isFetching = useIsFetching({ queryKey: ['user'] });

  // const [showComponents, setShowComponents] = useState(false);

  const firstLetter = data?.user?.name.charAt(0).toUpperCase();

  // console.log('task', task);

  // useEffect(() => {
  //   if (isFetching) {
  //     setShowComponents(false);
  //   } else {
  //     const timer = setTimeout(() => {
  //       setShowComponents(true);
  //     }, 400);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isFetching]);

  // if (isFetching || !showComponents) {
  //   return null;
  // }

  if (!task) {
    return null;
  }

  return (
    <div className="rounded-[8px] border-[1px] border-taskCardBorder px-[14px] pb-[18px] pt-[14px] dark:border-darkThemeBorder dark:bg-blackLightBg">
      <p className="mb-[28px] block text-[14px] leading-[1.28] text-blackCustom dark:text-white">
        {task?.title}
      </p>
      <div>
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[32px] border-[1.8px] border-blueMain text-[14px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[44px] md:w-[44px] md:rounded-[44px] md:text-[18px]">
          {data?.user?.avatarURL ? (
            <Image
              src={data?.user?.avatarURL}
              alt="user avatar"
              width={32}
              height={32}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <p>{firstLetter}</p>
          )}
        </div>
        <TaskToolbar />
      </div>
    </div>
  );
};
