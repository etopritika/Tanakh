import { Copy, Link, Settings } from "lucide-react";
import { useState } from "react";

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

const COLORS = [
  { name: "Зеленый", value: "#52fd46" },
  { name: "Красный", value: "#ff5a5a" },
  { name: "Желтый", value: "#fff75a" },
  { name: "Голубой", value: "#5aaaff" },
];

export default function VerseActionsDropdown() {
  const [selectedColor, setSelectedColor] = useState<string>("#52fd46");

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    //   onChangeColor(color);
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
          <DropdownMenuItem className="cursor-pointer">
            Копировать стих
            <DropdownMenuShortcut>
              <Copy />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
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
                    key={color.value}
                    className="cursor-pointer"
                    onClick={() => handleChangeColor(color.value)}
                  >
                    <span
                      className={`mr-2 inline-block h-4 w-4 rounded-full`}
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                    {selectedColor === color.value && " ✔"}
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
