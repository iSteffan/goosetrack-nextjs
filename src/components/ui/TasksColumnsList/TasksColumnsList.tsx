'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

import { useTasksStore } from '@/store/tasksStore';
import { TasksColumn } from './TasksColumn/TasksColumn';

import 'swiper/css';
import 'swiper/css/navigation';

interface TasksColumnsListProps {
  selectedDate: string;
}

const categories = ['To Do', 'In Progress', 'Done'] as const;

export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
  const { tasks, isLoading } = useTasksStore(state => state);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const swiperRef = useRef<SwiperType | null>(null);

  // Зберігаємо індекс при зміні слайда
  const handleSlideChange = () => {
    if (swiperRef.current) {
      const index = swiperRef.current.activeIndex;
      localStorage.setItem('activeSlide', index.toString());
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  // Повертаємося до збереженого індексу після зміни selectedDate
  useEffect(() => {
    const savedIndex = localStorage.getItem('activeSlide');
    if (swiperRef.current && savedIndex !== null) {
      swiperRef.current.slideTo(Number(savedIndex), 0);
    }
  }, [selectedDate]);

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

  return (
    <Swiper
      onSwiper={swiper => (swiperRef.current = swiper)}
      onSlideChange={handleSlideChange}
      {...swiperParams}
      className="w-full"
    >
      {isInitialLoad || isLoading ? <p>loading</p> : <>{columns}</>}
    </Swiper>
  );
};
