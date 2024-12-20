import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { books } from "@/lib/routes";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import BookLinks from "./BookLinks";
import { useLocation } from "react-router-dom";

export default function MobileSidebar() {
  const location = useLocation();
  const pathSegments: string[] = location.pathname
    .split("/")
    .filter((segment) => segment);
  const currentBook = pathSegments.at(1) || null;
  return (
    <Sheet>
      <SheetHeader className="sr-only">
        <SheetTitle>Навигация</SheetTitle>
        <SheetDescription>Выберите нужную книгу</SheetDescription>
      </SheetHeader>
      <SheetTrigger asChild>
        <button
          aria-label="Toggle Sidebar"
          className="p-2 h-10 w-10 md:hidden mr-2"
        >
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4 bg-white">
        <nav className="rounded-lg p-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Танах</AccordionTrigger>
              <BookLinks
                booksList={books.tora}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Невиим</AccordionTrigger>
              <BookLinks
                booksList={books.neviim}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Ктувим</AccordionTrigger>
              <BookLinks
                booksList={books.ketuvim}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
