import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import DeleteConfirmation from "./Delete-Confirmation";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import ModalContainer from "../Modal-Container";

import { toast } from "@/hooks/use-toast";
import { updateCommentInFirestore } from "@/lib/api/fetchFirestoreData";
import { FirestoreComment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

type EditModalProps = {
  comment: FirestoreComment;
  bookName: string;
};

export default function EditModal({ comment, bookName }: EditModalProps) {
  const { setOpen, setClose } = useModal();
  const [newComment, setComment] = useState(comment.text);
  const [isLoading, setIsLoading] = useState(false);
  const trimComment = newComment.trim();

  const handleConfirmDeletion = () => {
    setOpen(
      <ModalContainer>
        <DeleteConfirmation comment={comment} bookName={bookName} />
      </ModalContainer>,
    );
  };

  const handleEditComment = async () => {
    if (trimComment) {
      setIsLoading(true);
      try {
        await updateCommentInFirestore(bookName, comment, newComment);
        setClose();
      } catch (error) {
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
