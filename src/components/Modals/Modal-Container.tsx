import { X } from "lucide-react";
import React from "react";

import { useModal } from "@/providers/Modal/modal-context";

interface ModalProps {
  children: React.ReactNode;
}

export default function ModalContainer({ children }: ModalProps) {
  const { isOpen, setClose } = useModal();
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="relative w-full max-w-md rounded bg-white p-6 shadow-md">
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          onClick={setClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
