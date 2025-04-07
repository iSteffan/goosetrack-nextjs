'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useQueryClient } from '@tanstack/react-query';
import { TasksColumn } from './TasksColumn/TasksColumn';

import 'swiper/css';
import 'swiper/css/navigation';

interface TasksColumnsListProps {
  selectedDate: string;
}

export interface Task {
  _id: string;
  title: string;
  start: string;
  end: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
}

const categories = ['To Do', 'In Progress', 'Done'] as const;

export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
  const queryClient = useQueryClient();
  const tasks = queryClient.getQueryData<Task[]>(['tasks']);

  const swiperParams = {
    centeredSlides: false,
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      768: { slidesPerView: 2 },
      1280: { slidesPerView: 3, spaceBetween: 20 },
    },
  };

  const columns = categories.map(category => {
    const tasksByCategory =
      tasks?.filter(
        task => task.category === category && task.date === selectedDate,
      ) || [];

    return (
      <SwiperSlide key={category}>
        <TasksColumn
          title={category}
          selectedDate={selectedDate}
          tasks={tasksByCategory}
        />
      </SwiperSlide>
    );
  });

  return (
    <Swiper {...swiperParams} className="w-full">
      {columns}
    </Swiper>
  );
};
