import { CopyCheck, CopyX } from "lucide-react";

import { Button } from "../ui/button";

import { useCopyStore } from "@/store/use-copy-store";

export default function CopyControls() {
  const { isSelecting, verses, cancelSelection, copyToClipboard } =
    useCopyStore();
  const hasSelectedVerses = Object.keys(verses).length > 0;

  if (!isSelecting) return null;

  return (
    <div className="fixed bottom-4 z-50 flex w-[calc(100%-16px)] justify-center sm:w-[calc(100%-32px)] lg:left-80 lg:w-[calc(100%-320px)]">
      <div className="flex w-full max-w-sm justify-between sm:max-w-md">
        <Button
          variant={"outline"}
          onClick={cancelSelection}
          className="bg-brown-dark text-white"
          size={"sm"}
        >
          <CopyX /> Отмена
        </Button>
        <Button
          variant={"outline"}
          onClick={copyToClipboard}
          className="bg-brown-dark text-white"
          disabled={!hasSelectedVerses}
          size={"sm"}
        >
          <CopyCheck /> Копировать ({Object.keys(verses).length})
        </Button>
      </div>
    </div>
  );
}
