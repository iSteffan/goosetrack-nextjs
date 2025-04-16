'use client';

import { useQueryClient } from '@tanstack/react-query';

import { IUser } from '@/store/userStore';

// import { toast } from 'react-toastify';

export default function Page() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ user: IUser }>(['user']);
  // console.log('data statistics', data);
  // const router = useRouter();

  // Перевіряємо, чи є дані перед рендером
  if (!data?.user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <div>
        <p>Name: {data.user.name}</p>
        <p>Email: {data.user.email}</p>
        <p>Avatar URL: {data.user.avatarURL}</p>
        <p>Birthday: {data.user.birthday}</p>
        <p>Phone: {data.user.phone}</p>
        <p>Telegram: {data.user.telegram}</p>
      </div>
    </div>
  );
}
