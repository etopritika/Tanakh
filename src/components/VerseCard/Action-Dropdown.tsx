import { CirclePlus, Copy, Link, X } from "lucide-react";
import { useState, useRef, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AddModal from "../Modals/Comments/Add-Modal";
import ModalContainer from "../Modals/Modal-Container";

import { toast } from "@/hooks/use-toast";
import {
  createVerseColorInFirestore,
  updateVerseColorInFirestore,
} from "@/lib/api/fetchFirestoreData";
import { BookPathMap, Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

const COLORS = [
  { name: "Серый", value: "#E6E6E6" },
  { name: "Фиолетовый", value: "#EBC3FF" },
  { name: "Голубой", value: "#A1D1FF" },
  { name: "Зеленый", value: "#ACFFB7" },
  { name: "Без цвета", value: "white" },
];

interface ContextMenuProps {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
  docId: string;
  children: ReactNode;
}

export default function ActionDropdown({
  verse,
  onCopy,
  highlightColor,
  docId,
  children,
}: ContextMenuProps) {
  const { setOpen } = useModal();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isTablet =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  const verseContent = `${verse.verse}${verse.verse_ivrit ? `\n${verse.verse_ivrit}` : ""}`;
  const bookName = BookPathMap[verse.id_book].bookName;
  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;

  const closeMenu = () => {
    if (isOpen) {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      setIsOpen(false);
    }
  };

  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeMenu();
    setOpen(
      <ModalContainer>
        <AddModal bookName={bookName} verseId={verseId} />
      </ModalContainer>,
    );
  };

  const handleCopy = async (event: React.MouseEvent, content: string) => {
    event.stopPropagation();
    closeMenu();
    try {
      await navigator.clipboard.writeText(content);
      onCopy();
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать.",
        variant: "destructive",
      });
    }
  };

  const handleChangeColor = async (event: React.MouseEvent, color: string) => {
    event.stopPropagation();
    closeMenu();
    try {
      if (docId) {
        await updateVerseColorInFirestore(bookName, docId, verseId, color);
      } else {
        await createVerseColorInFirestore(bookName, verseId, color);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";

      toast({
        title: "Ошибка при обновлении цвета стиха",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleOpenDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const menuWidth = isTablet ? 256 : 224;
    const menuHeight = isTablet ? 251 : 239;

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > windowWidth) x = windowWidth - menuWidth - 10;
    if (y + menuHeight > windowHeight) y = windowHeight - menuHeight - 10;

    setPosition({ x, y });
    setIsOpen(true);
  };

  const handleCloseMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeMenu();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, []);

  return (
    <div className="relative w-full" onClick={handleOpenDropdown}>
      {children}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-[56px] z-40"
            onClick={handleCloseMenu}
          />
          <div
            ref={menuRef}
            className="fixed z-50 w-56 rounded-md border bg-white p-2 text-sm shadow-lg sm:w-64 sm:text-base"
            style={{ top: position.y, left: position.x }}
          >
            <div className="flex justify-between">
              <p className="px-3 py-2 text-sm font-semibold text-gray-700">
                Меню действий
              </p>
              <button className="px-2" onClick={handleCloseMenu}>
                <X size={18} />
              </button>
            </div>

            <hr className="my-1 border-gray-300" />

            <button
              className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
              onClick={handleOpenModal}
            >
              <CirclePlus className="h-4 w-4" />
              Добавить комментарий
            </button>
            <button
              className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
              onClick={(event) => handleCopy(event, verseContent)}
            >
              <Copy className="h-4 w-4" />
              Копировать стих
            </button>
            <button
              className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
              onClick={(event) =>
                handleCopy(
                  event,
                  `${window.location.origin}${pathname}#verse-${verse.poemNumber}`,
                )
              }
            >
              <Link className="h-4 w-4" />
              Копировать адрес стиха
            </button>

            <hr className="my-1 border-gray-300" />

            <p className="px-3 py-2 text-sm font-semibold text-gray-700">
              Изменить цвет
            </p>
            <div className="flex justify-around px-3">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  className={`h-6 w-6 rounded-full border ${
                    highlightColor === color.value ? "ring-2 ring-gray-500" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={(event) => handleChangeColor(event, color.value)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
