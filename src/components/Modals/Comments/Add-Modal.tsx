import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

import { toast } from "@/hooks/use-toast";
import { addCommentToFirestore } from "@/lib/api/fetchFirestoreData";
import { useModal } from "@/providers/Modal/modal-context";
import { useFirestoreStore } from "@/store/use-firestore-store";

export default function AddModal({
  bookName,
  verseId,
}: {
  bookName: string;
  verseId: string;
}) {
  const { setClose } = useModal();
  const { addComment } = useFirestoreStore();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async () => {
    if (comment.trim()) {
      setIsLoading(true);
      try {
        const newComment = await addCommentToFirestore(
          bookName,
          verseId,
          comment,
        );
        addComment(verseId, newComment);
        setClose();
      } catch (error) {
        console.error("Ошибка при добавлении комментария: ", error);
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";

        toast({
          title: "Ошибка при добавлении комментария",
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
      <h2 className="text-lg font-bold">Добавить коментарий</h2>
      <Textarea
        placeholder="Введите свой комментарий здесь."
        className="bg-white"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <Button
          className="bg-white"
          variant="outline"
          onClick={() => {
            setComment("");
            setClose();
          }}
        >
          Отмена
        </Button>
        <Button
          className="bg-brown-light text-white"
          onClick={handleAddComment}
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
