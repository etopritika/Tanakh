import { CirclePlus, Copy, Link, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

import AddModal from "../Modals/Comments/Add-Modal";
import ModalContainer from "../Modals/Modal-Container";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { name: "Без цвета", value: "transparent" },
];

export default function VerseActionsDropdown({
  verse,
  onCopy,
  highlightColor,
  docId,
}: {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
  docId: string;
}) {
  const { setOpen } = useModal();
  const { pathname } = useLocation();

  const verseContent = `${verse.verse}${verse.verse_ivrit ? `\n${verse.verse_ivrit}` : ""}`;

  const bookName = BookPathMap[verse.id_book].bookName;
  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;

  const handleOpenModal = () => {
    setOpen(
      <ModalContainer>
        <AddModal bookName={bookName} verseId={verseId} />
      </ModalContainer>,
    );
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(verseContent);
      onCopy();
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать текст.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    const verseUrl = `${window.location.origin}${pathname}#verse-${verse.poemNumber}`;
    try {
      await navigator.clipboard.writeText(verseUrl);
      onCopy();
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку.",
        variant: "destructive",
      });
    }
  };

  const handleChangeColor = async (color: string) => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-2 sm:px-4">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white sm:w-56">
        <DropdownMenuLabel>Меню действий</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleOpenModal}
          >
            Добавить кометарий
            <DropdownMenuShortcut>
              <CirclePlus />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleCopyText}>
            Копировать стих
            <DropdownMenuShortcut>
              <Copy />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleCopyLink}>
            Копировать адрес стиха
            <DropdownMenuShortcut>
              <Link />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              Изменить цвет
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-white">
                {COLORS.map((color) => (
                  <DropdownMenuItem
                    disabled={highlightColor === color.value}
                    key={color.value}
                    className="cursor-pointer"
                    onClick={() => handleChangeColor(color.value)}
                  >
                    <span
                      className={`mr-2 inline-block h-4 w-4 rounded-full`}
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
