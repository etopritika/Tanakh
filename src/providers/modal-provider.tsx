/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

type ModalContextType = {
  isOpen: boolean;
  setOpen: (modal: React.ReactNode) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<React.ReactNode>(null);

  const setOpen = (modal: React.ReactNode) => {
    setModal(modal);
    setIsOpen(true);
  };

  const setClose = () => {
    setIsOpen(false);
    setModal(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setOpen,
        setClose,
      }}
    >
      {children}
      {isOpen && modal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export default ModalProvider;
