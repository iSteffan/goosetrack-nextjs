'use client';

import { useQuery } from '@tanstack/react-query';

import { Header } from '@/components/common/Header/Header';
import { getUser } from '@/utils/auth';

export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  // if (isLoading) {
  //   return <div>Loading user data...</div>;
  // }

  // if (error instanceof Error) {
  //   return <div>Error loading user data: {error.message}</div>;
  // }

  // if (!data) {
  //   return <div>No user data found</div>;
  // }

  return (
    <>
      {/* Sidebar */}
      {/* <div className="w-1/4 p-4">
        <h2>User Info</h2>
        <p>Name: {data.user.name}</p>
        <p>Email: {data.user.email}</p> */}
      {/* {data.user.avatarURL && <img src={data.user.avatarURL} alt="Avatar" />} */}
      {/* </div> */}
      <Header data={data} />

      {/* Main Content */}
      {/* <main className="flex-1 p-4"> */}
      {children}
      {/* </main> */}
    </>
  );
}
