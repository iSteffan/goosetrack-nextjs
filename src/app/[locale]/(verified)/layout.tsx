'use client';

// import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { Header } from '@/components/common/Header/Header';
import Link from 'next/link';
// import { getUser } from '@/utils/auth';

// ----------------------------------------------
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getUser } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '@/components/common/BurgerMenu/BurgerMenu';
// --------------------------------------------

export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(['user']);

  const pathname = usePathname();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(cachedData === undefined);

  // Розбиваємо шлях на частини
  const pathParts = pathname.split('/').filter(Boolean);

  // Видаляємо інтернаціоналізацію
  let pageName = pathParts.length > 1 ? pathParts[1] : pathParts[0];

  if (pageName === 'account') {
    pageName = 'User Profile';
  }

  useEffect(() => {
    if (cachedData) {
      setIsFirstLoad(false);
    }
  }, [cachedData]);

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    notifyOnChangeProps: ['data'], // Only re-render when data changes
    initialData: cachedData, // Set initial data from cache
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['user'])?.dataUpdatedAt,
    enabled: isFirstLoad, // Enable query only on the first load
  });

  useEffect(() => {
    if (data) {
      setIsFirstLoad(false);
    }
  }, [data]);
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getUser,
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  //   notifyOnChangeProps: ['data'], // Only re-render when data changes
  // });

  // if (isLoading) {
  //   return <div>Loading user data...</div>;
  // }

  // if (error instanceof Error) {
  //   return <div>Error loading user data: {error.message}</div>;
  // }

  // if (!data) {
  //   return <div>No user data found</div>;
  // }

  const onCloseMenu = () => setIsBurgerOpen(false);
  const onOpenMenu = () => setIsBurgerOpen(true);

  return (
    <>
      {/* Sidebar */}
      {/* <div className="w-1/4 p-4">
        <h2>User Info</h2>
        <p>Name: {data.user.name}</p>
        <p>Email: {data.user.email}</p> */}
      {/* {data.user.avatarURL && <img src={data.user.avatarURL} alt="Avatar" />} */}
      {/* </div> */}
      <Header pageName={pageName} onOpen={onOpenMenu} />
      <BurgerMenu isOpen={isBurgerOpen} onClose={onCloseMenu} />
      <div className="mb-2 flex flex-col gap-1">
        <Link href={'/en/account'}>account</Link>
        <Link href={'/en/calendar'}>calendar</Link>
        <Link href={'/en/statistics'}>statistics</Link>
      </div>

      {children}
    </>
  );
}
