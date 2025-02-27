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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
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
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
        // Редирект на сторінку входу, якщо не вдалося отримати дані користувача
        router.push('/en/login');
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

  if (error) {
    return <div>Error: {error}</div>;
  }

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
