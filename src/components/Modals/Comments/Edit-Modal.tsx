import { useState } from "react";

import DeleteConfirmation from "./Delete-Confirmation";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import ModalContainer from "../Modal-Container";

import { editComment } from "@/components/VerseCard/actions";
import { toast } from "@/hooks/use-toast";
import { Comment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

type EditModalProps = {
  comment: Comment;
  bookName: string;
  verseId: string;
  handleUpdateComment: (newComment: Comment) => void;
  handleDeleteComment: (commentId: string) => void;
};

export default function EditModal({
  comment,
  bookName,
  verseId,
  handleUpdateComment,
  handleDeleteComment,
}: EditModalProps) {
  const { setOpen, setClose } = useModal();
  const [newComment, setComment] = useState(comment.text);

  const handleConfirmDeletion = () => {
    setOpen(
      <ModalContainer>
        <DeleteConfirmation
          onConfirm={() => handleDeleteComment(comment.id)}
          commentText={comment.text}
        />
      </ModalContainer>,
    );
  };

  const handleEditComment = async () => {
    if (newComment.trim()) {
      try {
        const editedComment = await editComment(
          bookName,
          verseId,
          comment.id,
          newComment,
        );
        handleUpdateComment(editedComment);
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
        >
          Изменить
        </Button>
      </div>
    </div>
  );
}
