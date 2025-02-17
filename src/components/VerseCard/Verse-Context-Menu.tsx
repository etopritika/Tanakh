import { Copy, Link } from "lucide-react";
import { useState } from "react";

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
// import { toast } from "@/hooks/use-toast";

const COLORS = [
  { name: "Зеленый", value: "#52fd46" },
  { name: "Красный", value: "#ff5a5a" },
  { name: "Желтый", value: "#fff75a" },
  { name: "Голубой", value: "#5aaaff" },
];

export default function VerseContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedColor, setSelectedColor] = useState<string>("");

  //   const handleCopyText = async () => {
  //     try {
  //       await navigator.clipboard.writeText(verseText);
  //       toast({
  //         title: "Текст скопирован",
  //         description: "Стих успешно скопирован в буфер обмена.",
  //         variant: "success",
  //       });
  //     } catch (error) {
  //       toast({
  //         title: "Ошибка",
  //         description: "Не удалось скопировать текст.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  //   const handleCopyLink = async () => {
  //     const verseUrl = `${window.location.origin}/verse/${verseId}`;
  //     try {
  //       await navigator.clipboard.writeText(verseUrl);
  //       toast({
  //         title: "Ссылка скопирована",
  //         description: "Адрес стиха успешно скопирован.",
  //         variant: "success",
  //       });
  //     } catch (error) {
  //       toast({
  //         title: "Ошибка",
  //         description: "Не удалось скопировать ссылку.",
  //         variant: "destructive",
  //       });
  //     }
  //   };

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    //   onChangeColor(color);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-white">
        <ContextMenuLabel>Меню действий</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem className="cursor-pointer">
          Копировать стих <Copy className="ml-auto h-4 w-4" />
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">
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
                key={color.value}
                className="cursor-pointer"
                onClick={() => handleChangeColor(color.value)}
              >
                <span
                  className="mr-2 inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
                {selectedColor === color.value && " ✔"}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
