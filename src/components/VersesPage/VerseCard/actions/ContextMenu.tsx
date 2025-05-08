import { CirclePlus, Copy, Link, X } from "lucide-react";
import { useState, ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";

import AddComment from "../../../Modals/Comments/AddComment";
import ModalContainer from "../../../Modals/ModalContainer";

import { useEscapeKey } from "@/hooks/use-escape-key";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { toast } from "@/hooks/use-toast";
import {
  createVerseColorInFirestore,
  updateVerseColorInFirestore,
} from "@/lib/api/fetchFirestoreData";
import { bookNameMap, BookPathMap, Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useSelectionStore } from "@/store/use-select-store";
import { useUserStore } from "@/store/use-user-store";

const COLORS = [
  { name: "Серый", value: "#E6E6E6" },
  { name: "Фиолетовый", value: "#EBC3FF" },
  { name: "Голубой", value: "#A1D1FF" },
  { name: "Зеленый", value: "#ACFFB7" },
  { name: "Без цвета", value: "transparent" },
];

interface ContextMenuProps {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
  docId: string;
  children: ReactNode;
}

export default function ContextMenu({
  verse,
  onCopy,
  highlightColor,
  docId,
  children,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);
  const { setOpen } = useModal();
  const { pathname } = useLocation();

  const { role } = useUserStore();
  const isAdmin = role === "admin";

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { startSelecting, isSelecting } = useSelectionStore();

  const isTablet =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  const bookPathName = BookPathMap[verse.id_book].bookName;
  const bookName = bookNameMap[bookPathName];
  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;
  const selectionId = `${verse.id_book}-${verse.id_chapter}-${verse.id_chapter_two || 1}-${verse.poemNumber}`;

  const closeMenu = () => {
    if (isOpen) {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      setIsOpen(false);
    }
  };

  const handleOpenAddComment = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeMenu();
    setOpen(
      <ModalContainer>
        <AddComment bookName={bookPathName} verseId={verseId} />
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
        await updateVerseColorInFirestore(bookPathName, docId, verseId, color);
      } else {
        await createVerseColorInFirestore(bookPathName, verseId, color);
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
    if (isSelecting) return null;
    event.preventDefault();
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const menuWidth = isTablet ? 256 : 224;
    const menuHeight = isAdmin ? (isTablet ? 308 : 292) : isTablet ? 251 : 239;

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

  useEscapeKey(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    document.body.style.touchAction = "auto";
  }, isOpen);

  useFocusTrap(menuRef, isOpen);

  return (
    <>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`action-menu-${verseId}`}
        onClick={handleOpenDropdown}
        className="relative flex w-full space-x-1 text-start sm:space-x-2"
      >
        {children}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-[56px] z-40"
            onClick={handleCloseMenu}
          />
          <ul
            className="fixed z-50 w-56 rounded-md border bg-white p-2 text-sm shadow-lg sm:w-64 sm:text-base"
            style={{ top: position.y, left: position.x }}
            aria-labelledby="menu-title"
            id={`action-menu-${verseId}`}
            role="menu"
            ref={menuRef}
          >
            <li
              role="presentation"
              className="flex items-center justify-between"
            >
              <h3
                id="menu-title"
                className="px-3 py-2 text-sm font-semibold text-gray-700"
              >
                Меню действий
              </h3>
              <button
                className="px-2"
                onClick={handleCloseMenu}
                aria-label="Закрыть контекстное меню"
              >
                <X size={18} aria-hidden="true" focusable="false" />
              </button>
            </li>

            <hr className="my-1 border-gray-300" />

            <li role="menuitem">
              <button
                className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
                onClick={handleOpenAddComment}
              >
                <CirclePlus
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                />
                Добавить комментарий
              </button>
            </li>
            <li role="menuitem">
              <button
                className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
                onClick={(event) => {
                  handleCloseMenu(event);
                  startSelecting(
                    "copy",
                    bookName,
                    verse.id_chapter,
                    selectionId,
                    verse,
                  );
                }}
              >
                <Copy
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                />
                Копировать стих
              </button>
            </li>
            <li role="menuitem">
              <button
                className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
                onClick={(event) =>
                  handleCopy(
                    event,
                    `${window.location.origin}${pathname}#verse-${verse.poemNumber}`,
                  )
                }
              >
                <Link
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                />
                Копировать адрес стиха
              </button>
            </li>

            <hr className="my-1 border-gray-300" />

            <li role="menuitem">
              <p className="px-3 py-2 text-sm font-semibold text-gray-700">
                Изменить цвет
              </p>
              <ul className="flex justify-around px-3 pb-2">
                {COLORS.map(({ value, name }) => (
                  <li key={value}>
                    <button
                      className={`h-6 w-6 rounded-full border ${
                        highlightColor === value ? "ring-2 ring-gray-500" : ""
                      }`}
                      style={{ backgroundColor: value }}
                      onClick={(event) => handleChangeColor(event, value)}
                      aria-label={name}
                    />
                  </li>
                ))}
              </ul>
            </li>
            {isAdmin && (
              <>
                <hr className="my-1 border-gray-300" />
                <li role="menuitem">
                  <button
                    className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-gray-100"
                    onClick={(event) => {
                      handleCloseMenu(event);
                      startSelecting(
                        "add",
                        bookName,
                        verse.id_chapter,
                        selectionId,
                        verse,
                      );
                    }}
                  >
                    <CirclePlus
                      className="h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                    />
                    Добавить на главную
                  </button>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </>
  );
}
