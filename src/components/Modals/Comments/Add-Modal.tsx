import { useState } from "react";

import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { addComment } from "../../VerseCard/actions";

import { Comment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

export default function AddModal({
  bookName,
  verseId,
  handleUpdateComment,
}: {
  bookName: string;
  verseId: string;
  handleUpdateComment: (newComment: Comment) => void;
}) {
  const { setClose } = useModal();
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        const newComment = await addComment(bookName, verseId, comment);
        handleUpdateComment(newComment);
        setClose();
      } catch (error) {
        console.error("Ошибка при добавлении комментария: ", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Добавить коментарий</h2>
      <Textarea
        placeholder="Введите свой комментарий здесь."
        className="bg-white"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <Button className="bg-white" variant="outline" onClick={setClose}>
          Отмена
        </Button>
        <Button
          className="bg-brown-light text-white"
          onClick={handleAddComment}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
}
