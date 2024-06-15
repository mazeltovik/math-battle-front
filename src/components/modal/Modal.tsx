import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useModal from '../../hooks/useModal';

type ModalProps = {
  className?: string;
  el?: string;
  children: React.ReactNode;
};

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export const Modal = ({ children, className, el = 'div' }: ModalProps) => {
  const { openModal, rollUp } = useModal();
  const [container] = useState(document.createElement(el));

  if (className) container.classList.add(className);

  useEffect(() => {
    if (openModal) {
      modalRoot.appendChild(container);
      document.body.style.overflow = 'hidden';
    }
    if (rollUp) {
      modalRoot.appendChild(container);
    }
    return () => {
      if (openModal) {
        modalRoot.removeChild(container);
        document.body.style.overflow = '';
      }
      if (rollUp) {
        modalRoot.removeChild(container);
      }
    };
  }, [container, openModal, rollUp]);

  return ReactDOM.createPortal(children, container);
};
