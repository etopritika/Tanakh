import React, { createContext, useContext } from "react";

type ModalContextType = {
  isOpen: boolean;
  setOpen: (modal: React.ReactNode) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};
