import { Pencil } from "lucide-react";

import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";

type EditCommentButtonProps = {
  onEdit: () => void;
  commentId: string;
};

export default function EditCommentButton({
  onEdit,
  commentId,
}: EditCommentButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          className="bg-white p-2"
          onClick={onEdit}
          aria-label="Изменить комментарий"
          aria-describedby={commentId}
        >
          <Pencil size={20} aria-hidden="true" focusable="false" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white" aria-hidden="true">
        <p>Изменить комментарий</p>
      </TooltipContent>
    </Tooltip>
  );
}
