'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';

interface Task {
  _id: string;
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
}

interface StatisticsChartProps {
  tasks: Task[];
  selectedDate: string;
}

export const StatisticsChart = ({
  tasks,
  selectedDate,
}: StatisticsChartProps) => {
  const selected = new Date(selectedDate);

  const categories = ['To Do', 'In Progress', 'Done'];
  //   console.log('selectedDate', selectedDate);

  const filterTasks = (range: 'day' | 'month') =>
    tasks.filter(task => {
      const taskDate = parseISO(task.date);
      return range === 'day'
        ? isSameDay(taskDate, selected)
        : isSameMonth(taskDate, selected);
    });

  const countByCategory = (filteredTasks: Task[]) =>
    categories.map(cat => filteredTasks.filter(t => t.category === cat).length);

  const dayTasks = filterTasks('day');
  const monthTasks = filterTasks('month');

  const dayCounts = countByCategory(dayTasks);
  const monthCounts = countByCategory(monthTasks);

  const maxCount = Math.max(...dayCounts, ...monthCounts, 1);

  const data = categories.map((cat, index) => ({
    category: cat,
    day: Math.round((dayCounts[index] / maxCount) * 100),
    month: Math.round((monthCounts[index] / maxCount) * 100),
    dayCount: dayCounts[index],
    monthCount: monthCounts[index],
  }));

  return (
    <div className="rounded-[29px] border-[0.8px] border-bluePale px-[14px] py-[40px] dark:border-darkThemeBorder">
      <p className="mb-[20px] text-[14px] font-600 leading-[1.5] text-blackText">
        Tasks
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={30}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              `${value}%`,
              name === 'day' ? 'By Day' : 'By Month',
            ]}
          />
          <Bar dataKey="day" fill="#FFD2DD">
            <LabelList dataKey="dayCount" position="top" />
          </Bar>
          <Bar dataKey="month" fill="#3E85F3">
            <LabelList dataKey="monthCount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
