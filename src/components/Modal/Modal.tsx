import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { IBaseComponentProps } from '@/types';

export interface IModal extends IBaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  headerChildren?: React.ReactChild;
  footerChildren?: React.ReactChild;
}

function Modal({
  isOpen,
  onClose,
  headerChildren,
  footerChildren,
  children,
}: IModal) {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative max-w-lg mx-auto rounded bg-light">
            {headerChildren && (
              <Dialog.Title className="px-5 py-2 text-xl font-bold border-b-2 border-borderGray">
                {headerChildren}
              </Dialog.Title>
            )}
            <div className="px-5 py-2 border-b-2 border-borderGray">
              {children}
            </div>
            {footerChildren && (
              <Dialog.Description className="text-xl text-center bg-half hover:bg-warning">
                {footerChildren}
              </Dialog.Description>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
