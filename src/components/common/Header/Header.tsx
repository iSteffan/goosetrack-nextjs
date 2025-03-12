'use client';

import { useEffect, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';
import { Modal } from '@/components/ui/Modal/Modal';

import MenuIcon from '@/public/icon/menu.svg';
import { FeedbackForm } from '../FeedbackForm/FeedbackForm';

import 'react-loading-skeleton/dist/skeleton.css';

interface IHeader {
  pageName: string;
  onOpen: () => void;
}

export const Header = ({ pageName, onOpen }: IHeader) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isFetching = useIsFetching({ queryKey: ['user'] });

  useEffect(() => {
    if (isFetching) {
      setShowComponents(false); 
    } else {
      const timer = setTimeout(() => {
        setShowComponents(true); 
      }, 300); 
      return () => clearTimeout(timer); 
    }
  }, [isFetching]);

  return (
    <>
      <header className="bg-grayBg dark:bg-blackPageBg">
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

          <div className="flex w-full items-center justify-end leading-[1]">
            {isFetching || !showComponents ? (
              <div className="h-[32px] w-[231px] md:h-[44px] md:w-[314px]">
                <Skeleton
                  className="h-[32px] dark:bg-blueMain md:h-[44px]"
                  containerClassName="flex-1"
                />
              </div>
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
        <FeedbackForm />
      </Modal>
    </>
  );
};
