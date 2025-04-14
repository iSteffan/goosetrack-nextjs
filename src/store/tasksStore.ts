import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; // імпортуємо devtools

import { Task } from '@/components/ui/TasksColumnsList/TasksColumnsList';

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  setTasks: (tasks: Task[]) => void;
  setLoading: (isLoading: boolean) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export const useTasksStore = create<TasksState>()(
  devtools(
    set => ({
      tasks: [],
      isLoading: false,
      setTasks: tasks => set({ tasks }),
      setLoading: isLoading => set({ isLoading }),
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
