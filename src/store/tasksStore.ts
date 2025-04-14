import { Task } from '@/components/ui/TasksColumnsList/TasksColumnsList';
import { create } from 'zustand';

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  setTasks: (tasks: Task[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useTasksStore = create<TasksState>(set => ({
  tasks: [],
  isLoading: false,
  setTasks: tasks => set({ tasks }),
  setLoading: isLoading => set({ isLoading }),
}));
