import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

import { useEscapeKey } from "@/hooks/use-escape-key";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useModal } from "@/providers/Modal/modal-context";

interface ModalProps {
  children: React.ReactNode;
}

export default function ModalContainer({ children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpen, setClose } = useModal();

  useFocusTrap(modalRef, isOpen);

  useEscapeKey(setClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto p-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        className="absolute left-1/2 top-1/2 w-full max-w-md translate-x-[-50%] translate-y-[-40%] transform rounded bg-white p-6 shadow-md sm:translate-y-[-50%]"
      >
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          onClick={setClose}
          aria-label="Закрыть модальное окно"
        >
          <X aria-hidden="true" focusable="false" />
        </button>
        {children}
      </div>
    </div>
  );
}
