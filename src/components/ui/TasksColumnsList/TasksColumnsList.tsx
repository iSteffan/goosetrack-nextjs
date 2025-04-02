import { TasksColumn } from './TasksColumn/TasksColumn';

interface TasksColumnsListProps {
  selectedDate: string;
}

export const TasksColumnsList = ({ selectedDate }: TasksColumnsListProps) => {
  return (
    <div>
      <div>Контент календаря для {selectedDate}</div>
      <TasksColumn title="To Do" selectedDate={selectedDate} />
      <TasksColumn title="In Progress" selectedDate={selectedDate} />
      <TasksColumn title="Done" selectedDate={selectedDate} />
    </div>
  );
};
