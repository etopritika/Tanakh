import { ChevronsRight, CopyX, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

import { useToast } from "@/hooks/use-toast";
import { addVerseToHomepage } from "@/lib/api/fetchFirestoreData";
import { useSelectionStore } from "@/store/use-select-store";

export default function AddToHomepageControls() {
  const { toast, dismiss } = useToast();
  const { isSelecting, mode, verses, cancelSelection } = useSelectionStore();
  const [isLoading, setIsLoading] = useState(false);
  const hasSelectedVerses = Object.keys(verses).length > 0;

  if (!isSelecting || mode !== "add") return null;

  const handleAddToHomepage = async () => {
    setIsLoading(true);

    try {
      await addVerseToHomepage(verses);

      const { id } = toast({
        title: "Успешно",
        description: (
          <Link
            to="/"
            className="flex items-center gap-2 underline"
            onClick={() => dismiss(id)}
          >
            Стихи добавлены на главную. <ChevronsRight />
          </Link>
        ),
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
      setIsLoading(false);
    }
  };

  return (
    <div
      role="region"
      aria-busy={isLoading}
      aria-label="Управление добавлением стихов на главную"
      className="fixed bottom-4 z-50 flex w-[calc(100%-16px)] justify-center sm:w-[calc(100%-32px)] lg:left-80 lg:w-[calc(100%-320px)]"
    >
      <div
        className="flex w-full max-w-sm justify-between sm:max-w-md"
        role="group"
      >
        <Button
          variant="outline"
          onClick={cancelSelection}
          className="bg-brown-dark text-white"
          size="sm"
          aria-label="Отменить добавление стихов"
        >
          <CopyX aria-hidden="true" focusable="false" /> Отмена
        </Button>
        <Button
          variant="outline"
          onClick={handleAddToHomepage}
          className="bg-brown-dark text-white"
          disabled={!hasSelectedVerses || isLoading}
          size="sm"
          aria-label={`Добавить выбранные стихи на главную (${Object.keys(verses).length})`}
        >
          <Plus className="mr-1" aria-hidden="true" focusable="false" />
          {isLoading
            ? "Добавление..."
            : `Добавить (${Object.keys(verses).length})`}
        </Button>
      </div>
    </div>
  );
}
