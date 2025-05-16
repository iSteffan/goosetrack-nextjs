'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useTasksStore } from '@/store/tasksStore';
import { useUserStore } from '@/store/userStore';

import { Header } from '@/components/common/Header/Header';
import { BurgerMenu } from '@/components/common/BurgerMenu/BurgerMenu';
import { SideBar } from '@/components/common/SideBar/SideBar';

import { fetchTasks } from '@/utils/getTask';
import { getUser } from '@/utils/getAuth';

export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('VerifiedUserLayout');

  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const pathParts = pathname.split('/').filter(Boolean);
  let pageName = pathParts.length > 1 ? pathParts[1] : pathParts[0];
  if (pageName === 'account') {
    pageName = t('account');
  } else if (pageName === 'calendar') {
    pageName = t('calendar');
  } else {
    pageName = t('statistics');
  }

  // --------------------------------------------user---------------------------------------

  const { setUser, setIsUserLoading } = useUserStore();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: true,
    staleTime: 1000 * 60 * 5,
    notifyOnChangeProps: ['data'],
  });

  useEffect(() => {
    setIsUserLoading(isUserLoading);
    if (userData?.user) {
      setUser(userData.user);
    }
  }, [userData, isUserLoading, setUser, setIsUserLoading]);

  // --------------------------------------------tasks---------------------------------------

  const { setTasks, setTaskLoading } = useTasksStore(state => state);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 хвилин кешу
    notifyOnChangeProps: ['data'],
  });

  useEffect(() => {
    setTaskLoading(isLoading);
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks, isLoading, setTasks, setTaskLoading]);

  // ------------------------------------------------------------------------------------------

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1440px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsBurgerOpen(false);
    };
    if (mediaQuery.matches) setIsBurgerOpen(false);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  const onCloseMenu = () => setIsBurgerOpen(false);
  const onOpenMenu = () => setIsBurgerOpen(true);

  return (
    <div className="min-h-screen bg-grayBg dark:bg-blackPageBg xl:pl-[289px]">
      <SideBar />

      <div className="flex w-full flex-col">
        <Header pageName={pageName} onOpen={onOpenMenu} />
        <BurgerMenu isOpen={isBurgerOpen} onClose={onCloseMenu} />

        {children}
      </div>
    </div>
  );
}
