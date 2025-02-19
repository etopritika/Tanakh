import { Copy, Link, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

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
import { updateVerseColorInFirestore } from "@/lib/api/fetchFirestoreData";
import { BookPathMap, Verse } from "@/lib/types";
import { useFirestoreStore } from "@/store/use-firestore-store";

const COLORS = [
  { name: "Зеленый", value: "#52fd46" },
  { name: "Красный", value: "#ff5a5a" },
  { name: "Желтый", value: "#fff75a" },
  { name: "Голубой", value: "#5aaaff" },
];

export default function VerseActionsDropdown({
  verse,
  onCopy,
  highlightColor,
}: {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Меню действий</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
