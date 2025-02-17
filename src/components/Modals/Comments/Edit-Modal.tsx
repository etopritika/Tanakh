import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import DeleteConfirmation from "./Delete-Confirmation";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import ModalContainer from "../Modal-Container";

import { toast } from "@/hooks/use-toast";
import { editCommentInFirestore } from "@/lib/api/fetchFirestoreData";
import { Comment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useFirestoreStore } from "@/store/use-firestore-store";

type EditModalProps = {
  comment: Comment;
  bookName: string;
  verseId: string;
};

export default function EditModal({
  comment,
  bookName,
  verseId,
}: EditModalProps) {
  const { setOpen, setClose } = useModal();
  const { updateComment } = useFirestoreStore();
  const [newComment, setComment] = useState(comment.text);
  const [isLoading, setIsLoading] = useState(false);
  const trimComment = newComment.trim();

  const handleConfirmDeletion = () => {
    setOpen(
      <ModalContainer>
        <DeleteConfirmation
          comment={comment}
          bookName={bookName}
          verseId={verseId}
        />
      </ModalContainer>,
    );
  };

  const handleEditComment = async () => {
    if (trimComment) {
      setIsLoading(true);
      try {
        await editCommentInFirestore(bookName, verseId, comment.id, newComment);
        updateComment(verseId, comment.id, newComment);
        setClose();
      } catch (error) {
        console.error("Ошибка при редактировании комментария: ", error);
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";

        toast({
          title: "Ошибка при редактировании комментария",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Изменить коментарий</h2>
      <Textarea
        placeholder="Введите свой комментарий здесь."
        className="bg-white"
        value={newComment || ""}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <Button
          className="bg-danger text-white"
          variant="outline"
          onClick={handleConfirmDeletion}
        >
          Удалить
        </Button>
        <Button
          className="bg-brown-light text-white"
          onClick={handleEditComment}
          disabled={isLoading || !trimComment}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin text-white" />
              Изменение...
            </>
          ) : (
            "Изменить"
          )}
        </Button>
      </div>
    </div>
  );
}
