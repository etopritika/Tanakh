import { Pencil } from "lucide-react";

import { Button } from "../../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";

type EditCommentButtonProps = {
  onEdit: () => void;
};

export default function EditCommentButton({ onEdit }: EditCommentButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="bg-white p-2" onClick={onEdit}>
            <Pencil size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white">
          <p>Изменить кометарий</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
