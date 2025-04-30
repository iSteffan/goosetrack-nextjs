import { ITask } from '@/store/tasksStore';
import { TaskColumnCard } from './TaskColumnCard/TaskColumnCard';

interface ColumnsTasksListProps {
  tasks: ITask[];
  maxHeight: string;
}

export const ColumnsTasksList = ({
  tasks,
  maxHeight,
}: ColumnsTasksListProps) => {
  return (
    <ul
      className="flex flex-col gap-[14px]"
      style={{ maxHeight, overflowY: 'auto' }}
    >
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
