import { CirclePlus, Copy, Link } from "lucide-react";
import { useLocation } from "react-router-dom";

import AddModal from "../Modals/Comments/Add-Modal";
import ModalContainer from "../Modals/Modal-Container";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
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

export default function VerseContextMenu({
  verse,
  onCopy,
  highlightColor,
  docId,
  children,
}: {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
  docId: string;
  children: React.ReactNode;
}) {
  const { setOpen } = useModal();
  const { pathname } = useLocation();
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;

  if (!isDesktop) {
    return <>{children}</>;
  }

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
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-white">
        <ContextMenuItem className="cursor-pointer" onClick={handleOpenModal}>
          Добавить кометарий <CirclePlus className="ml-auto h-4 w-4" />
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer" onClick={handleCopyText}>
          Копировать стих <Copy className="ml-auto h-4 w-4" />
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer" onClick={handleCopyLink}>
          Копировать адрес стиха <Link className="ml-auto h-4 w-4" />
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger className="cursor-pointer">
            Изменить цвет
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="bg-white">
            {COLORS.map((color) => (
              <ContextMenuItem
                disabled={highlightColor === color.value}
                key={color.value}
                className="cursor-pointer"
                onClick={() => handleChangeColor(color.value)}
              >
                <span
                  className="mr-2 inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
