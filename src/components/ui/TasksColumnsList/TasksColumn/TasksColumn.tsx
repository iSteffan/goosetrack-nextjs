import { AddTaskBtn } from './AddTaskBtn/AddTaskBtn';
import { ColumnHeadBar } from './ColumnHeadBar/ColumnHeadBar';
import { ColumnsTasksList } from './ColumnsTasksList/ColumnsTasksList';

export const TasksColumn = () => {
  return (
    <div>
      TasksColumn
      <ColumnHeadBar title="To Do" />
      <ColumnsTasksList />
      <AddTaskBtn />
    </div>
  );
};
