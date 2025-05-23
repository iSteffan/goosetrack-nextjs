'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';
import { Modal } from '@/components/ui/Modal/Modal';
import { HeaderLoader } from '@/components/ui/HeaderLoader/HeaderLoader';
import { FeedbackForm } from '../FeedbackForm/FeedbackForm';

import MenuIcon from '@/public/icon/menu.svg';
import GooseIcon from '@/public/icon/hasToDoTaskGoose.svg';

import { useUserStore } from '@/store/userStore';
import { useTasksStore } from '@/store/tasksStore';

import { fetchReview } from '@/utils/getReviews';

interface IHeader {
  pageName: string;
  onOpen: () => void;
}

export const Header = ({ pageName, onOpen }: IHeader) => {
  const t = useTranslations('Header');

  const { params = [] } = useParams();
  const { tasks } = useTasksStore(state => state);

  const initialDate = params[1] || format(new Date(), 'yyyy-MM-dd');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { isUserLoading } = useUserStore();

  const { data: review, isLoading: isReviewLoading } = useQuery({
    queryKey: ['review'],
    queryFn: fetchReview,
    staleTime: 1000 * 60 * 5, // 5 хв кешу
  });

  useEffect(() => {
    if (!isUserLoading) {
      setIsInitialLoad(false);
    }
  }, [isUserLoading]);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const hasToDoTaskForDate = tasks.some(
    task => task.date === initialDate && task.category === 'To Do',
  );

  return (
    <>
      <header>
        <div className="container flex items-center justify-between py-[24px] xl:px-[32px] xl:pb-[16px] xl:pt-[32px]">
          <div className="relative hidden xl:block">
            {hasToDoTaskForDate && (
              <>
                <GooseIcon className="absolute left-[-40px] top-[-5px] h-[60px] w-[64px]" />
                <p className="absolute left-0 top-[40px] w-[350px] text-[14px] font-600 leading-[1.28] text-blackCustom">
                  <span className="text-blueMain">{t('firstText')}</span>
                  {t('secondText')}
                </p>
              </>
            )}
            <p className="relative z-10 hidden text-[32px] font-700 capitalize dark:text-white xl:block">
              {pageName}
            </p>
          </div>

          <button
            type="button"
            className="group xl:hidden"
            onClick={() => onOpen()}
          >
            <MenuIcon className="h-[24px] w-[24px] stroke-blackCustom transition-colors group-hover:stroke-blueMain dark:stroke-white" />
          </button>

          <div className="flex items-center justify-end leading-[1]">
            {isInitialLoad || isUserLoading ? (
              <HeaderLoader />
            ) : (
              <>
                <AddFeedbackBtn onOpen={handleToggleModal} />
                <ThemeToggle />
                <UserInfo />
              </>
            )}
          </div>
        </div>
      </header>

      <Modal isOpen={isModalOpen} onClose={handleToggleModal} isFeedback>
        <FeedbackForm
          onClose={handleToggleModal}
          review={review}
          isReviewLoading={isReviewLoading}
        />
      </Modal>
    </>
  );
};
