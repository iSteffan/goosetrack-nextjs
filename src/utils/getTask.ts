import axios from 'axios';

import { TaskFormData } from '@/components/common/TaskForm/TaskForm';
import { useTasksStore } from '@/store/tasksStore';

export type TaskData = Partial<TaskFormData>;

// export const fetchTasks = async () => {
//   const response = await axios.get('/api/tasks', {
//     withCredentials: true,
//   });
//   return response.data.tasks;
// };

export const fetchTasks = async () => {
  try {
    const response = await axios.get('/api/tasks', {
      withCredentials: true,
    });
    return response.data.tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const loadTasks = async () => {
  const tasks = await fetchTasks();
  const setTasks = useTasksStore.getState().setTasks;
  setTasks(tasks);
};

export const createTask = async (task: TaskData) => {
  const response = await axios.post('/api/tasks/create', task, {
    withCredentials: true,
  });
  return response.data;
};

export const updateTask = async (taskId: string, data: TaskData) => {
  const response = await axios.patch(`/api/tasks/update/${taskId}`, data);
  return response.data;
};

export const deleteTaskById = async (taskId: string) => {
  const response = await axios.delete(`/api/tasks/delete/${taskId}`, {
    withCredentials: true,
  });
  return response.data;
};
