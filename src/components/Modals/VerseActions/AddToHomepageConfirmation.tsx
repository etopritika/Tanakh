import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addVerseToHomepage } from "@/lib/api/fetchFirestoreData";
import { Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

interface AddToHomepageConfirmationProps {
  verse: Verse;
}

export default function AddToHomepageConfirmation({
  verse,
}: AddToHomepageConfirmationProps): JSX.Element {
  const { setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToHomepage = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true);

    try {
      await addVerseToHomepage(verse);
      toast({
        title: "Успешно",
        description: "Стих добавлен на главную.",
        variant: "success",
      });
      setClose();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Не удалось добавить стих на главную страницу";

      toast({
        title: "Ошибка",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-bold">
          Добавить стих на главную страницу?
        </h2>
        <p className="font-normal italic">{verse.verse}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="bg-white" onClick={setClose}>
          Отмена
        </Button>
        <Button
          className="bg-blue-600 text-white"
          onClick={(event) => {
            handleAddToHomepage(event);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-white" />
              Добавление...
            </>
          ) : (
            "Добавить"
          )}
        </Button>
      </div>
    </div>
  );
}
