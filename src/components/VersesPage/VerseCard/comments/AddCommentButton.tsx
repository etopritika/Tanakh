import { CirclePlus } from "lucide-react";
import { memo } from "react";

import { Button } from "../../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";

const AddCommentButton = memo(function AddCommentButton({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onAdd} className="bg-white p-2" variant="outline">
            <CirclePlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white">
          <p>Добавить кометарий</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export default AddCommentButton;
