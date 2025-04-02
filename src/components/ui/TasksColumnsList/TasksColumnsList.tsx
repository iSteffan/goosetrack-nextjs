import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { TasksColumn } from './TasksColumn/TasksColumn';

import 'swiper/css';
import 'swiper/css/navigation';

interface TasksColumnsListProps {
  selectedDate: string;
}

export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
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
