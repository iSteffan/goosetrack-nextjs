import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { TasksColumn } from './TasksColumn/TasksColumn';
import { fetchTasks } from '@/utils/getTask';

import 'swiper/css';
import 'swiper/css/navigation';

interface TasksColumnsListProps {
  selectedDate: string;
}

interface Task {
  _id: string;
  title: string;
  start: string;
  end: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
}

export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.log('Помилка при завантаженні завдань');
        console.error(err);
      }
    };

    getTasks();
  }, []);

  console.log('tasks', tasks);

  const swiperParams = {
    centeredSlides: false,
    modules: [Navigation],

    slidesPerView: 1,
    spaceBetween: 16,

    breakpoints: {
      768: {
        slidesPerView: 2,
      },

      1280: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  return (
    <Swiper {...swiperParams} className={`w-full`}>
      <SwiperSlide>
        <TasksColumn title="To Do" selectedDate={selectedDate} />
      </SwiperSlide>

      <SwiperSlide>
        <TasksColumn title="In Progress" selectedDate={selectedDate} />
      </SwiperSlide>

      <SwiperSlide>
        <TasksColumn title="Done" selectedDate={selectedDate} />
      </SwiperSlide>
    </Swiper>
  );
};
