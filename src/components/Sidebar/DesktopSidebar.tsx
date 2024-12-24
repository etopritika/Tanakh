import { books } from "@/lib/routes";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import BookLinks from "./BookLinks";
import { Link, useLocation } from "react-router-dom";
import { useReadingStore } from "@/store/use-reading-store";
import { BookMarked } from "lucide-react";

export default function DesktopSidebar() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const currentSection = pathSegments.at(0) || "";
  const currentBook = pathSegments.at(1) || "";

  const { lastPathname, chapterName } = useReadingStore(
    (state) => state.lastRead
  );

  return (
    <aside
      className={`hidden md:block md:fixed left-0 top-0 w-80 z-50 h-screen bg-white p-4`}
    >
      <nav className="rounded-lg p-2">
        <Link
          to="/"
          className={`block py-4 border-b ${
            currentSection === ""
              ? "underline font-bold text-primary"
              : "hover:underline"
          }`}
        >
          Танах
        </Link>
        <Accordion type="single" collapsible defaultValue={currentSection}>
          <AccordionItem value="tora">
            <AccordionTrigger>Тора</AccordionTrigger>
            <BookLinks booksList={books.tora} currentBook={currentBook} />
          </AccordionItem>
          <AccordionItem value="neviim">
            <AccordionTrigger>Невиим</AccordionTrigger>
            <BookLinks booksList={books.neviim} currentBook={currentBook} />
          </AccordionItem>
          <AccordionItem value="ketuvim">
            <AccordionTrigger>Ктувим</AccordionTrigger>
            <BookLinks booksList={books.ketuvim} currentBook={currentBook} />
          </AccordionItem>
        </Accordion>
        {lastPathname && chapterName && (
          <Link
            to={lastPathname}
            className={`flex items-center py-4 border-b text-sm ${
              pathname === lastPathname
                ? "underline font-bold text-primary"
                : "hover:underline"
            }`}
          >
            <BookMarked className="mr-2" size={16} /> {chapterName}
          </Link>
        )}
      </nav>
    </aside>
  );
}
