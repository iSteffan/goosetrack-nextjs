import { Dialog, DialogPanel } from '@headlessui/react';

export interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProp) => {
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
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
