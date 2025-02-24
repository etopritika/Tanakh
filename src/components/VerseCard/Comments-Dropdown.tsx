import { MessageSquareText } from "lucide-react";

import CommentsPanel from "./Comments-Panel";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Verse } from "@/lib/types";

export default function CommentsDropdown({ verse }: { verse: Verse }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded bg-background px-3"
    >
      <AccordionItem value="comment">
        <AccordionTrigger className="py-3 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-text">Комментарии</span>
            <MessageSquareText size={15} className="text-text" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="py-3">
          <CommentsPanel defaultVerse={verse} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
