'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { useIsFetching } from '@tanstack/react-query';

import { useTasksStore } from '@/store/tasksStore';
import { TasksColumn } from './TasksColumn/TasksColumn';

import { TaskSkeleton } from '../TaskSkeleton/TaskSkeleton';

import 'swiper/css';
import 'swiper/css/navigation';

interface TasksColumnsListProps {
  selectedDate: string;
}

const categories = ['To Do', 'In Progress', 'Done'] as const;

export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
  const { tasks, isTaskLoading } = useTasksStore(state => state);
  const isFetching = useIsFetching({ queryKey: ['tasks'] });

  const swiperRef = useRef<SwiperType | null>(null);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);

  // Зберігаємо індекс при зміні слайда
  const handleSlideChange = () => {
    if (swiperRef.current) {
      const index = swiperRef.current.activeIndex;
      localStorage.setItem('activeSlide', index.toString());
    }
  };

  const swiperParams = {
    centeredSlides: false,
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3, spaceBetween: 20 },
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

  useLayoutEffect(() => {
    if (!isFetching && !isTaskLoading && !isSwiperInitialized) {
      setIsSwiperInitialized(true);
    }
  }, [isFetching, isTaskLoading, isSwiperInitialized]);

  if (isFetching || isTaskLoading) {
    return (
      <div className="flex w-full gap-[16px] xl:gap-[20px]">
        <div className="w-full md:w-1/2 xl:w-1/3">
          <TaskSkeleton />
        </div>
        <div className="hidden w-full md:block md:w-1/2 xl:w-1/3">
          <TaskSkeleton />
        </div>
        <div className="hidden w-full xl:block xl:w-1/3">
          <TaskSkeleton />
        </div>
      </div>
    );
  }

  return (
    isSwiperInitialized && (
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;

          // Встановлюємо слайд після ініціалізації
          const savedIndex = localStorage.getItem('activeSlide');
          if (savedIndex !== null) {
            swiper.slideTo(Number(savedIndex), 0);
          }
        }}
        onSlideChange={handleSlideChange}
        {...swiperParams}
        className="w-full"
      >
        {columns}
      </Swiper>
    )
  );
};
