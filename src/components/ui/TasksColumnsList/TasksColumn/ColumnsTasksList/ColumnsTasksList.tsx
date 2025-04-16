import { ITask } from '@/store/tasksStore';
import { TaskColumnCard } from './TaskColumnCard/TaskColumnCard';

interface ColumnsTasksListProps {
  tasks: ITask[];
}

export const ColumnsTasksList = ({ tasks }: ColumnsTasksListProps) => {
  // console.log('ColumnsTasksList tasks', tasks);
  return (
    <ul className="flex flex-col gap-[14px]">
      {tasks.map(task => {
        return (
          <li key={task._id}>
            <TaskColumnCard task={task} />
          </li>
        );
      })}
    </ul>
  );
};
