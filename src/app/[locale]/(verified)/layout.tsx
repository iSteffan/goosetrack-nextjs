'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useTasksStore } from '@/store/tasksStore';
import { Header } from '@/components/common/Header/Header';
import { BurgerMenu } from '@/components/common/BurgerMenu/BurgerMenu';
import { SideBar } from '@/components/common/SideBar/SideBar';
import { fetchTasks } from '@/utils/getTask';

export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const pathParts = pathname.split('/').filter(Boolean);
  let pageName = pathParts.length > 1 ? pathParts[1] : pathParts[0];
  if (pageName === 'account') pageName = 'User Profile';

  const { setTasks, setLoading } = useTasksStore(state => state); // Оновлюємо тільки завдання і loading в Zustand

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: true, // Вмикаємо автоматичне отримання
    staleTime: 1000 * 60 * 5, // 5 хвилин кешу
    notifyOnChangeProps: ['data'],
  });

  useEffect(() => {
    setLoading(isLoading);
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks, isLoading, setTasks, setLoading]);

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
    <div className="min-h-screen xl:pl-[289px]">
      <SideBar />
      <div className="flex w-full flex-col">
        <Header pageName={pageName} onOpen={onOpenMenu} />
        <BurgerMenu isOpen={isBurgerOpen} onClose={onCloseMenu} />

        {children}
      </div>
    </div>
  );
}
