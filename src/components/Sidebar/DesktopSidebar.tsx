import { BookMarked } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import BookLinks from "./BookLinks";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";

import { BOOKS } from "@/lib/routes";
import { useReadingStore } from "@/store/use-reading-store";

export default function DesktopSidebar() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const currentSection = pathSegments[0] || "";
  const currentBook = pathSegments[1] || "";

  const { lastPathname, chapterName } = useReadingStore(
    (state) => state.lastRead,
  );

  return (
    <aside
      className={`left-0 top-0 z-50 hidden h-screen w-80 bg-white p-4 lg:fixed lg:block`}
    >
      <nav className="rounded-lg p-2">
        <Link
          to="/"
          className={`block border-b py-4 ${
            currentSection === "" ? "font-bold" : ""
          }`}
        >
          Танах
        </Link>
        <Accordion type="single" collapsible defaultValue={currentSection}>
          <AccordionItem value="tora">
            <AccordionTrigger>Тора</AccordionTrigger>
            <BookLinks booksList={BOOKS.tora} currentBook={currentBook} />
          </AccordionItem>
          <AccordionItem value="neviim">
            <AccordionTrigger>Невиим</AccordionTrigger>
            <BookLinks booksList={BOOKS.neviim} currentBook={currentBook} />
          </AccordionItem>
          <AccordionItem value="ketuvim">
            <AccordionTrigger>Ктувим</AccordionTrigger>
            <BookLinks booksList={BOOKS.ketuvim} currentBook={currentBook} />
          </AccordionItem>
        </Accordion>
        {lastPathname && chapterName && (
          <Link
            to={lastPathname}
            className={`flex items-center border-b py-4 text-sm ${
              pathname === lastPathname ? "font-bold" : ""
            }`}
          >
            <BookMarked className="mr-2" size={16} /> {chapterName}
          </Link>
        )}
      </nav>
    </aside>
  );
}
