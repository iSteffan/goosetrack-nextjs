import { Dialog, DialogPanel } from '@headlessui/react';

import CloseIcon from '@/public/icon/x-close.svg';

export interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isFeedback?: boolean;
}

export const Modal = ({ isOpen, onClose, children, isFeedback }: ModalProp) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div
        className={`fixed inset-0 z-10 w-screen overflow-y-auto ${
          isOpen ? 'backdrop-blur-[2px]' : ''
        }`}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="duration-300 ease-out data-[closed]:opacity-0"
          >
            <div
              className={`dark:bg-blackLightBg relative rounded-[8px] border-[1px] border-inputBorder bg-white ${
                isFeedback
                  ? 'px-[20px] py-[28px] md:p-[32px]'
                  : 'px-[18px] py-[40px] md:px-[28px]'
              }`}
            >
              {children}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-[14px] top-[14px]"
              >
                <CloseIcon className="h-[24px] w-[24px] stroke-blackCustom transition-colors hover:stroke-blueMain dark:stroke-white dark:hover:stroke-blueMain" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
