// export const Page=()=> {
//   return (
//     <>
//       <div>statistics page</div>
//     </>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

// import { toast } from 'react-toastify';

// interface User {
//   name: string;
//   email: string;
//   avatarURL: string;
//   birthday: string;
//   phone: string;
//   telegram: string;
// }

export default function Page() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['user']);
  // console.log('data statistics', data);
  const router = useRouter();

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

  return (
    <div>
      <h1>User Information</h1>
      {data.user ? (
        <div>
          <div>
            <p>Name: {data.user.name}</p>
            <p>Email: {data.user.email}</p>
            <p>Avatar URL: {data.user.avatarURL}</p>
            <p>Birthday: {data.user.birthday}</p>
            <p>Phone: {data.user.phone}</p>
            <p>Telegram: {data.user.telegram}</p>
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
