import { IUser } from '@/components/common/UserForm/UserForm';

export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await fetch('/api/auth/users/current', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to logout');
  }
};

// export const updateUser = async (userData: Partial<IUser>) => {
//   try {
//     const response = await fetch('/api/auth/users/edit', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
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

    const response = await fetch('/api/auth/users/edit', {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
