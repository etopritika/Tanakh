import { CopyX, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

import { toast } from "@/hooks/use-toast";
import { addVerseToHomepage } from "@/lib/api/fetchFirestoreData";
import { useSelectionStore } from "@/store/use-select-store";

export default function AddToHomepageControls() {
  const { isSelecting, mode, verses, cancelSelection } = useSelectionStore();
  const [isPending, setIsPending] = useState(false);
  const hasSelectedVerses = Object.keys(verses).length > 0;

  if (!isSelecting || mode !== "add") return null;

  const handleAddToHomepage = async () => {
    setIsPending(true);

    try {
      await addVerseToHomepage(verses);

      toast({
        title: "Успешно",
        description: "Стихи добавлены на главную.",
        variant: "success",
      });
      cancelSelection();
    } catch (error: unknown) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось добавить стихи на главную.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed bottom-4 z-50 flex w-[calc(100%-16px)] justify-center sm:w-[calc(100%-32px)] lg:left-80 lg:w-[calc(100%-320px)]">
      <div className="flex w-full max-w-sm justify-between sm:max-w-md">
        <Button
          variant="outline"
          onClick={cancelSelection}
          className="bg-brown-dark text-white"
          size="sm"
        >
          <CopyX /> Отмена
        </Button>
        <Button
          variant="outline"
          onClick={handleAddToHomepage}
          className="bg-brown-dark text-white"
          disabled={!hasSelectedVerses || isPending}
          size="sm"
        >
          <Plus className="mr-1" />
          {isPending
            ? "Добавление..."
            : `Добавить (${Object.keys(verses).length})`}
        </Button>
      </div>
    </div>
  );
}
