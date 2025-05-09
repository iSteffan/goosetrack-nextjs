'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';
import { Modal } from '@/components/ui/Modal/Modal';
import { HeaderLoader } from '@/components/ui/HeaderLoader/HeaderLoader';
import { FeedbackForm } from '../FeedbackForm/FeedbackForm';

import MenuIcon from '@/public/icon/menu.svg';
import { useUserStore } from '@/store/userStore';
import { fetchReview } from '@/utils/getReviews';

interface IHeader {
  pageName: string;
  onOpen: () => void;
}

export const Header = ({ pageName, onOpen }: IHeader) => {
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

  return (
    <>
      <header>
        <div className="flex items-center justify-between px-[20px] py-[24px] md:px-[32px] xl:pb-[] xl:pt-[32px]">
          <p className="hidden text-[32px] font-700 capitalize dark:text-white xl:block">
            {pageName}
          </p>

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
        {/* <FeedbackForm onClose={handleToggleModal} /> */}

        <FeedbackForm
          onClose={handleToggleModal}
          review={review}
          isReviewLoading={isReviewLoading}
        />
      </Modal>
    </>
  );
};
