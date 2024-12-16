import { books } from "@/lib/routes";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import BookLinks from "./BookLinks";

interface DesktopSidebarProps {
  currentBook: string | null;
}

export default function DesktopSidebar({ currentBook }: DesktopSidebarProps) {
  return (
    <aside className="hidden md:block md:max-w-80 w-full h-full p-4 shadow-lg rounded-lg bg-white">
      <nav className="rounded-lg p-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Танах</AccordionTrigger>
            <BookLinks booksList={books.tora} currentBook={currentBook} />
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Невиим</AccordionTrigger>
            <BookLinks booksList={books.neviim} currentBook={currentBook} />
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Ктувим</AccordionTrigger>
            <BookLinks booksList={books.ketuvim} currentBook={currentBook} />
          </AccordionItem>
        </Accordion>
      </nav>
    </aside>
  );
}
