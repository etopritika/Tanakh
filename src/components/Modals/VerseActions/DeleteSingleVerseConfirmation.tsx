import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteVerseFromHomepage } from "@/lib/api/fetchFirestoreData";
import { Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useHomepageVersesStore } from "@/store/use-homepage-verses";

interface DeleteHomepageConfirmationProps {
  verse: Verse;
}

export default function DeleteSingleVerseConfirmation({
  verse,
}: DeleteHomepageConfirmationProps): JSX.Element {
  const { removeVerseById } = useHomepageVersesStore();
  const { setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteHomepage = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true);

    try {
      if (verse.documentId) {
        await deleteVerseFromHomepage(verse.documentId);
      } else {
        throw new Error("Идентификатор документа не определён.");
      }
      removeVerseById(verse.documentId);
      setClose();
    } catch (error: unknown) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Произошла неизвестная ошибка.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-bold">Удалить стих с главной страницы?</h2>
        <p className="font-normal italic">{verse.verse}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="bg-white" onClick={setClose}>
          Отмена
        </Button>
        <Button
          className="bg-danger text-white"
          onClick={(event) => {
            handleDeleteHomepage(event);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-white" />
              Удаление...
            </>
          ) : (
            "Удалить"
          )}
        </Button>
      </div>
    </div>
  );
}
