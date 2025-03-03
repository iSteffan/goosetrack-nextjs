// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default async function VerifiedUserLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token')?.value;

//   if (!token) {
//     redirect('/en/login');
//   }

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}

//       {/* Main Content */}
//       <main className="">{children}</main>
//     </div>
//   );
// }

'use client'; 

import { getUser } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';


export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error instanceof Error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4">
        <h2>User Info</h2>
        <p>Name: {data.user.name}</p>
        <p>Email: {data.user.email}</p>
        {/* {data.user.avatarURL && <img src={data.user.avatarURL} alt="Avatar" />} */}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
