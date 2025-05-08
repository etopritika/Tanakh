import { CopyCheck, CopyX } from "lucide-react";

import { Button } from "../ui/button";

import { useSelectionStore } from "@/store/use-select-store";

export default function CopyControls() {
  const { isSelecting, mode, verses, cancelSelection, copyToClipboard } =
    useSelectionStore();
  const hasSelectedVerses = Object.keys(verses).length > 0;

  if (!isSelecting || mode !== "copy") return null;

  return (
    <div
      role="region"
      aria-label="Управление копированием стихов"
      className="fixed bottom-4 z-50 flex w-[calc(100%-16px)] justify-center sm:w-[calc(100%-32px)] lg:left-80 lg:w-[calc(100%-320px)]"
    >
      <div
        className="flex w-full max-w-sm justify-between sm:max-w-md"
        role="group"
      >
        <Button
          variant={"outline"}
          onClick={cancelSelection}
          className="bg-brown-dark text-white"
          size={"sm"}
          aria-label="Отменить копирование стихов"
        >
          <CopyX aria-hidden="true" focusable="false" /> Отмена
        </Button>
        <Button
          variant={"outline"}
          onClick={copyToClipboard}
          className="bg-brown-dark text-white"
          disabled={!hasSelectedVerses}
          size={"sm"}
          aria-label={`Копировать выбранные стихи (${Object.keys(verses).length})`}
        >
          <CopyCheck aria-hidden="true" focusable="false" /> Копировать (
          {Object.keys(verses).length})
        </Button>
      </div>
    </div>
  );
}
