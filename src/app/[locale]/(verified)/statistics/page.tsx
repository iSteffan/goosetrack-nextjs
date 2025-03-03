// export const Page=()=> {
//   return (
//     <>
//       <div>statistics page</div>
//     </>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/auth';

import { toast } from 'react-toastify';

interface User {
  name: string;
  email: string;
  avatarURL: string;
  birthday: string;
  phone: string;
  telegram: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData.user);
        // toast.success('Registration successful! Please log in.');
        // router.push('/en/login');
      } catch (error) {
        console.log('error', error);
        router.push('/en/login');
        //   const errorMessage =
        //     (error as Error).message || 'Registration failed. Try again.';
        toast.error('Error getting user data');
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Перенаправлення на головну сторінку після логауту
      router.push('/en');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Avatar URL: {user.avatarURL}</p>
            <p>Birthday: {user.birthday}</p>
            <p>Phone: {user.phone}</p>
            <p>Telegram: {user.telegram}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
