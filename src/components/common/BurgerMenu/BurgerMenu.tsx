import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { SideBar } from '../SideBar/SideBar';

type IMenu = {
  isOpen: boolean;
  onClose: () => void;
};

export const BurgerMenu = ({ isOpen, onClose }: IMenu) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
              >
                <Dialog.Panel className="pointer-events-auto relative w-[225px] bg-white dark:bg-blackSidebarBg md:w-[289px]">
                  <SideBar onClose={onClose} isBurgerMenu />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
