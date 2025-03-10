'use client';

import { useState } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { AddFeedbackBtn } from '@/components/ui/AddFeedbackBtn/AddFeedbackBtn';
import { UserInfo } from '@/components/ui/UserInfo/UserInfo';
import { Modal } from '@/components/ui/Modal/Modal';

import MenuIcon from '@/public/icon/menu.svg';

interface IHeader {
  pageName: string;
  onOpen: () => void;
}

export const Header = ({ pageName, onOpen }: IHeader) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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

          <div className="flex items-center">
            <AddFeedbackBtn onOpen={handleToggleModal} />

            <ThemeToggle />

            <UserInfo />
          </div>
        </div>
      </header>

      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <div className="h-[500px] w-[500px] bg-red-600">modal</div>
      </Modal>
    </>
  );
};
