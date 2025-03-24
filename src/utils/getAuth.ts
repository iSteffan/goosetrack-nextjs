import axios from 'axios';

import { IUser } from '@/components/common/UserForm/UserForm';

const api = axios.create({
  baseURL: '/api/auth',
  headers: { 'Content-Type': 'application/json' },
});

// -------------------------------------------------------------All comments are left for educational purposes----------------------------------------------------------
// export const registerUser = async (formData: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Registration failed');
//     }

//     return data;
//   } catch (error) {
//     console.error('Registration error:', error);
//     throw error;
//   }
// };

export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post('/register', formData);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

// export const loginUser = async (formData: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }

//     return data;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post('/login', formData);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

// export const getUser = async () => {
//   try {
//     const response = await fetch('/api/auth/users/current', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch user data');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };

export const getUser = async () => {
  try {
    const { data } = await api.get('/users/current');
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Error fetching user data',
      );
    }
    throw new Error('An unexpected error occurred');
  }
  // } catch (error) {
  //   console.error('Error fetching user data:', error);
  //   throw error;
  // }
};

// export const logout = async () => {
//   const response = await fetch('/api/auth/logout', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to logout');
//   }
// };

export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Logout error');
    }
    throw new Error('An unexpected error occurred');
  }
  // } catch (error) {
  //   console.error('Logout error:', error);
  //   throw error;
  // }
};

// export const updateUser = async (userData: Partial<IUser>, avatar?: File) => {
//   try {
//     const formData = new FormData();

//     Object.entries(userData).forEach(([key, value]) => {
//       if (value) formData.append(key, value);
//     });

//     if (avatar) {
//       formData.append('avatarURL', avatar);
//     }

//     const response = await fetch('/api/auth/users/edit', {
//       method: 'PATCH',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update user data');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error updating user data:', error);
//     throw error;
//   }
// };

export const updateUser = async (userData: Partial<IUser>, avatar?: File) => {
  try {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (avatar) {
      formData.append('avatarURL', avatar);
    }

    const { data } = await api.patch('/users/edit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Error updating user data',
      );
    }
    throw new Error('An unexpected error occurred');
  }
  // } catch (error) {
  //   console.error('Error updating user data:', error);
  //   throw error;
  // }
};
