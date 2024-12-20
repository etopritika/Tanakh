import { books } from "@/lib/routes";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import BookLinks from "./BookLinks";
import { Link, useLocation } from "react-router-dom";

export default function DesktopSidebar() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const currentSection = pathSegments.at(0) || "";
  const currentBook = pathSegments.at(1) || "";
  const isSearchPage = pathname.includes("/search");

  return (
    <aside
      className={`hidden md:block md:fixed left-0 w-80 z-50 h-screen p-4 shadow-lg rounded-lg bg-white ${
        isSearchPage ? "top-0" : "top-14"
      }`}
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
          Главная
        </Link>
        <Accordion type="single" collapsible defaultValue={currentSection}>
          <AccordionItem value="tanah">
            <AccordionTrigger>Танах</AccordionTrigger>
            <BookLinks booksList={books.tanah} currentBook={currentBook} />
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
      </nav>
    </aside>
  );
}
