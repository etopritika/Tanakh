import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteAllHomepageVerses } from "@/lib/api/fetchFirestoreData";
import { useModal } from "@/providers/Modal/modal-context";
import { useHomepageVersesStore } from "@/store/use-homepage-verses";

export default function DeleteAllVersesConfirmation() {
  const { setClose } = useModal();
  const { clearVerses } = useHomepageVersesStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAll = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true);

    try {
      await deleteAllHomepageVerses();
      clearVerses();
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
      <h2 className="text-lg font-bold">
        Удалить все стихи с главной страницы?
      </h2>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="bg-white" onClick={setClose}>
          Отмена
        </Button>
        <Button
          className="bg-danger text-white"
          onClick={handleDeleteAll}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-white" />
              Удаление...
            </>
          ) : (
            "Удалить все"
          )}
        </Button>
      </div>
    </div>
  );
}
