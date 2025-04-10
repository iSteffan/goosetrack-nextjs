// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import { useQuery } from '@tanstack/react-query';
// import { fetchTasks } from '@/utils/getTask';
// import { TasksColumn } from './TasksColumn/TasksColumn';

// import 'swiper/css';
// import 'swiper/css/navigation';

// interface TasksColumnsListProps {
//   selectedDate: string;
// }

// export interface Task {
//   _id: string;
//   title: string;
//   start: string;
//   end: string;
//   priority: 'Low' | 'Medium' | 'High';
//   date: string;
//   category: 'To Do' | 'In Progress' | 'Done';
// }

// const categories = ['To Do', 'In Progress', 'Done'] as const;

// export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
//   const { data: tasks = [] } = useQuery<Task[]>({
//     queryKey: ['tasks'],
//     queryFn: fetchTasks,
//   });

//   // console.log('TasksColumnsList tasks', tasks);

//   const swiperParams = {
//     centeredSlides: false,
//     modules: [Navigation],
//     slidesPerView: 1,
//     spaceBetween: 16,
//     breakpoints: {
//       768: { slidesPerView: 2 },
//       1280: { slidesPerView: 3, spaceBetween: 20 },
//     },
//   };

//   const columns = categories.map(category => {
//     const tasksByCategory =
//       tasks?.filter(
//         task => task.category === category && task.date === selectedDate,
//       ) || [];

//     return (
//       <SwiperSlide key={category}>
//         <TasksColumn
//           title={category}
//           selectedDate={selectedDate}
//           tasks={tasksByCategory}
//         />
//       </SwiperSlide>
//     );
//   });

//   return (
//     <Swiper {...swiperParams} className="w-full">
//       {columns}
//     </Swiper>
//   );
// };

'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Swiper as SwiperType } from 'swiper';

import { TasksColumn } from './TasksColumn/TasksColumn';
import { fetchTasks } from '@/utils/getTask';

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
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const swiperRef = useRef<SwiperType | null>(null);

  // Зберігаємо індекс при зміні слайда
  const handleSlideChange = () => {
    if (swiperRef.current) {
      const index = swiperRef.current.activeIndex;
      localStorage.setItem('activeSlide', index.toString());
    }
  };

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
      {columns}
    </Swiper>
  );
};
