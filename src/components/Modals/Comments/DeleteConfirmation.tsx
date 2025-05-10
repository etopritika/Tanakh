import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "../../ui/button";

import { toast } from "@/hooks/use-toast";
import { deleteCommentFromFirestore } from "@/lib/api/fetchFirestoreData";
import { FirestoreComment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

export default function DeleteConfirmation({
  comment,
  bookName,
}: {
  comment: FirestoreComment;
  bookName: string;
}) {
  const { setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      await deleteCommentFromFirestore(bookName, comment);
      setClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";

      toast({
        title: "Ошибка при удалении комментария",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="space-y-6"
      aria-describedby="modal-comment modal-description"
      aria-busy={isLoading}
    >
      <div>
        <h2 id="modal-title" className="text-lg font-bold">
          Вы действительно хотите удалить комментарий?
        </h2>
        <p
          id="modal-comment"
          className="inline-block max-w-[300px] truncate font-normal italic"
          title={comment.text}
        >
          {comment.text}
        </p>
        <p id="modal-description" className="sr-only">
          Подтвердите удаление комментария. Кнопка отмены закроет модальное
          окно.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="bg-white" onClick={setClose}>
          Отмена
        </Button>
        <Button
          className="bg-danger text-white"
          onClick={handleDeleteComment}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoaderCircle
                className="mr-2 h-5 w-5 animate-spin text-white"
                aria-hidden="true"
                focusable="false"
              />
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
