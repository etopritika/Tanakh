import React, { useState } from "react";

import { ModalContext } from "./modal-context";

interface ModalProviderProps {
  children: React.ReactNode;
}

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
    <ModalContext.Provider value={{ isOpen, setOpen, setClose }}>
      {children}
      {isOpen && modal}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
