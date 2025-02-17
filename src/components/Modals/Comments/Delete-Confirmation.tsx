import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "../../ui/button";

import { useModal } from "@/providers/Modal/modal-context";

export default function DeleteConfirmation({
  onConfirm,
  commentText,
}: {
  onConfirm: () => void;
  commentText: string;
}) {
  const { setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setClose();
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
          title={commentText}
        >
          {commentText}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="bg-white" onClick={setClose}>
          Отмена
        </Button>
        <Button
          className="bg-danger text-white"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Удалить{" "}
          {isLoading && (
            <LoaderCircle className="h-5 w-5 animate-spin text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}
