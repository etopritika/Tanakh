import {
  Sheet,
  SheetClose,
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
import { Link, useLocation } from "react-router-dom";

export default function MobileSidebar() {
  const location = useLocation();
  const pathSegments: string[] = location.pathname
    .split("/")
    .filter((segment) => segment);
  const currentSection = pathSegments.at(0) || "";
  const currentBook = pathSegments.at(1) || "";
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
          <SheetClose asChild>
            <Link
              to="/"
              className={`block py-4 border-b ${
                currentSection === ""
                  ? "underline font-bold text-primary"
                  : "hover:underline"
              }`}
            >
              Главная
            </Link>
          </SheetClose>
          <Accordion type="single" collapsible defaultValue={currentSection}>
            <AccordionItem value="tanah">
              <AccordionTrigger>Танах</AccordionTrigger>
              <BookLinks
                booksList={books.tanah}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
            <AccordionItem value="neviim">
              <AccordionTrigger>Невиим</AccordionTrigger>
              <BookLinks
                booksList={books.neviim}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
            <AccordionItem value="ketuvim">
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
