import { MessageSquareText } from "lucide-react";

import CommentsPanel from "../comments/CommentsPanel";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Verse } from "@/lib/types";
import { useSelectionStore } from "@/store/use-select-store";

export default function CommentsDropdown({ verse }: { verse: Verse }) {
  const { isSelecting } = useSelectionStore();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded bg-background px-3"
    >
      <AccordionItem value="comment">
        <AccordionTrigger
          className={`py-3 text-sm ${
            isSelecting ? "pointer-events-none opacity-50" : ""
          }`}
          tabIndex={isSelecting ? -1 : 0}
          aria-disabled={isSelecting}
        >
          <div className="flex items-center space-x-2">
            <span className="text-text">Комментарии</span>
            <MessageSquareText
              size={15}
              className="text-text"
              aria-hidden="true"
              focusable="false"
            />
          </div>
        </AccordionTrigger>
        {!isSelecting && (
          <AccordionContent className="py-3">
            <CommentsPanel defaultVerse={verse} />
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
}
