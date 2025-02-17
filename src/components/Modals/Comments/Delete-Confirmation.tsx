import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "../../ui/button";

import { toast } from "@/hooks/use-toast";
import { deleteCommentFromFirestore } from "@/lib/api/fetchFirestoreData";
import { Comment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useFirestoreStore } from "@/store/use-firestore-store";

export default function DeleteConfirmation({
  comment,
  bookName,
  verseId,
}: {
  comment: Comment;
  bookName: string;
  verseId: string;
}) {
  const { setClose } = useModal();
  const { deleteComment } = useFirestoreStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      await deleteCommentFromFirestore(bookName, verseId, comment.id);
      deleteComment(verseId, comment.id);
      setClose();
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold">
          Вы действительно хотите удалить комментарий?
        </h2>
        <span
          className="inline-block max-w-[300px] truncate font-normal italic"
          title={comment.text}
        >
          {comment.text}
        </span>
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
