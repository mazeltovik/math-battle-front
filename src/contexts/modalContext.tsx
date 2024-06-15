import { createContext, useState, ReactNode } from 'react';

type Children = {
  children: ReactNode;
};

type ModalContextType = {
  openModal: boolean;
  rollUp: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRollUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>({
  openModal: false,
  rollUp: false,
  setOpenModal: () => {},
  setRollUp: () => {},
});

export const ModalProvider = ({ children }: Children) => {
  const [openModal, setOpenModal] = useState(false);
  const [rollUp, setRollUp] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        openModal,
        rollUp,
        setOpenModal,
        setRollUp,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
