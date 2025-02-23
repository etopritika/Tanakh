import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

import { toast } from "@/hooks/use-toast";
import { addCommentToFirestore } from "@/lib/api/fetchFirestoreData";
import { useModal } from "@/providers/Modal/modal-context";

export default function AddModal({
  bookName,
  verseId,
}: {
  bookName: string;
  verseId: string;
}) {
  const { setClose } = useModal();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const trimComment = comment.trim();

  const handleAddComment = async () => {
    if (trimComment) {
      setIsLoading(true);
      try {
        await addCommentToFirestore(bookName, verseId, comment);
        setClose();
      } catch (error) {
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
          disabled={isLoading || !trimComment}
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
