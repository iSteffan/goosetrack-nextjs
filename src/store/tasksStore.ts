import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ITask {
  _id: string;
  title: string;
  start: string;
  end: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
}

interface TasksState {
  tasks: ITask[];
  isTaskLoading: boolean;
  setTasks: (tasks: ITask[]) => void;
  setTaskLoading: (isLoading: boolean) => void;
  addTask: (task: ITask) => void;
  updateTask: (taskId: string, updatedTask: ITask) => void;
  deleteTask: (taskId: string) => void;
}

export const useTasksStore = create<TasksState>()(
  devtools(
    set => ({
      tasks: [],
      isTaskLoading: false,
      setTasks: tasks => set({ tasks }),
      setTaskLoading: isLoading => set({ isTaskLoading: isLoading }),
      addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
      updateTask: (taskId, updatedTask) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task._id === taskId ? { ...task, ...updatedTask } : task,
          ),
        })),
      deleteTask: taskId =>
        set(state => ({
          tasks: state.tasks.filter(task => task._id !== taskId),
        })),
    }),
    { name: 'tasks-store' },
  ),
);
