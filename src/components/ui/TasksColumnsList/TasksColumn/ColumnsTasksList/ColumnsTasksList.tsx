import { Task } from '../../TasksColumnsList';
import { TaskColumnCard } from './TaskColumnCard/TaskColumnCard';

interface ColumnsTasksListProps {
  tasks: Task[];
}

export const ColumnsTasksList = ({ tasks }: ColumnsTasksListProps) => {
  return (
    <div>
      <TaskColumnCard task={tasks[0]} />
    </div>
  );
};
