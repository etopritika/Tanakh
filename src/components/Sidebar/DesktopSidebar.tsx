import { books } from "@/lib/routes";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import BookLinks from "./BookLinks";
import { useLocation } from "react-router-dom";

export default function DesktopSidebar() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const currentBook = pathSegments.at(1) || null;
  const isSearchPage = pathname.includes("/search");
  return (
    <aside
      className={`hidden md:block md:fixed left-0 w-80 z-50 h-screen p-4 shadow-lg rounded-lg bg-white ${
        isSearchPage ? "top-0" : "top-14"
      }`}
    >
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
