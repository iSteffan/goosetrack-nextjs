'use client';

// import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { Header } from '@/components/common/Header/Header';
// import { getUser } from '@/utils/auth';

// ----------------------------------------------
// import {
//   useQueryClient,
//   useQuery
// } from '@tanstack/react-query';
// import { getUser } from '@/utils/getAuth';
import { useEffect, useState } from 'react';
import { BurgerMenu } from '@/components/common/BurgerMenu/BurgerMenu';
import { SideBar } from '@/components/common/SideBar/SideBar';
// --------------------------------------------

export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const queryClient = useQueryClient();
  // const cachedData = queryClient.getQueryData(['user']);

  const pathname = usePathname();
  // console.log('pathname', pathname);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  // const [isFirstLoad, setIsFirstLoad] = useState(cachedData === undefined);

  // Розбиваємо шлях на частини
  const pathParts = pathname.split('/').filter(Boolean);
  // console.log('pathParts', pathParts);

  // Видаляємо інтернаціоналізацію
  let pageName = pathParts.length > 1 ? pathParts[1] : pathParts[0];

  if (pageName === 'account') {
    pageName = 'User Profile';
  }

  // useEffect(() => {
  //   if (cachedData) {
  //     setIsFirstLoad(false);
  //   }
  // }, [cachedData]);

  // const { data } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getUser,
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  //   notifyOnChangeProps: ['data'], // Only re-render when data changes
  //   initialData: cachedData, // Set initial data from cache
  //   initialDataUpdatedAt: () =>
  //     queryClient.getQueryState(['user'])?.dataUpdatedAt,
  //   // enabled: isFirstLoad, // Enable query only on the first load
  // });

  // useEffect(() => {
  //   if (data) {
  //     setIsFirstLoad(false);
  //   }
  // }, [data]);

  // Логіка для прослуховування зміни ширини екрана
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1440px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsBurgerOpen(false); // Закриваємо бургер-меню, якщо екран більший за 1440px
      }
    };

    // Початкове перевірка
    if (mediaQuery.matches) {
      setIsBurgerOpen(false); // Якщо екран уже більший за 1440px
    }

    // Додаємо слухач змін
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const onCloseMenu = () => setIsBurgerOpen(false);
  const onOpenMenu = () => setIsBurgerOpen(true);

  return (
    <>
      <div className="min-h-screen xl:grid xl:grid-cols-[auto_1fr]">
        <SideBar />
        <div className="flex w-full flex-col">
          <Header pageName={pageName} onOpen={onOpenMenu} />
          <BurgerMenu isOpen={isBurgerOpen} onClose={onCloseMenu} />
          {children}
        </div>
      </div>
    </>
  );
}
