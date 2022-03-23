import { IModal } from '@/components/Modal/Modal';
import { useState } from 'react';

export function useModalState() {
  const initialState = { isOpen: false, onClose: closeModal };

  const [modal, setModal] = useState(initialState);

  function openModal(props: Omit<IModal, 'isOpen' | 'onClose'>) {
    setModal({ ...initialState, ...props, isOpen: true });
  }

  function closeModal() {
    setModal(initialState);
  }

  return { modal, openModal, closeModal };
}
