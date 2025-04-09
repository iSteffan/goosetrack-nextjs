import axios from 'axios';

interface TaskData {
  title: string;
  start: string;
  end: string;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  category: 'To Do' | 'In Progress' | 'Done';
}

export const fetchTasks = async () => {
  const response = await axios.get('/api/tasks', {
    withCredentials: true,
  });
  return response.data.tasks;
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

// export const deleteTask = async (taskId: string) => {
//   const response = await axios.delete(`/api/tasks/delete/${taskId}`);
//   return response.data;
// };
