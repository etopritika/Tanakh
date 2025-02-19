import { Copy, Link } from "lucide-react";
import { useLocation } from "react-router-dom";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { toast } from "@/hooks/use-toast";
import { updateVerseColorInFirestore } from "@/lib/api/fetchFirestoreData";
import { BookPathMap, Verse } from "@/lib/types";
import { useFirestoreStore } from "@/store/use-firestore-store";

const COLORS = [
  { name: "Зеленый", value: "#52fd46" },
  { name: "Красный", value: "#ff5a5a" },
  { name: "Желтый", value: "#fff75a" },
  { name: "Голубой", value: "#5aaaff" },
];

export default function VerseContextMenu({
  verse,
  onCopy,
  highlightColor,
  children,
}: {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const { updateVerseColor } = useFirestoreStore();

  const verseContent = `${verse.verse}${verse.verse_ivrit ? `\n${verse.verse_ivrit}` : ""}`;

  const bookName = BookPathMap[verse.id_book].bookName;
  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;

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
      await updateVerseColorInFirestore(bookName, verseId, color);
      updateVerseColor(verseId, color);
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
        <ContextMenuLabel>Меню действий</ContextMenuLabel>
        <ContextMenuSeparator />
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
