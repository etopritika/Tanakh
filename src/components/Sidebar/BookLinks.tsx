import { SheetClose } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { AccordionContent } from "../ui/accordion";

interface BookLinksProps {
  booksList: { id: string; name: string; href: string; disabled?: boolean }[];
  currentBook: string | null;
  closeOnClick?: boolean; // Опціональний параметр для Sheet
}

export default function BookLinks({
  booksList,
  currentBook,
  closeOnClick = false,
}: BookLinksProps) {
  return (
    <>
      {booksList.map(({ id, name, href, disabled }) => (
        <AccordionContent key={id} className="pl-3">
          {closeOnClick ? (
            <SheetClose asChild>
              <Link
                to={href}
                className={`${
                  disabled ? "cursor-not-allowed" : "hover:underline"
                } ${currentBook === id ? "underline font-bold" : ""}`}
              >
                {name}
              </Link>
            </SheetClose>
          ) : (
            <Link
              to={href}
              className={`${
                disabled ? "cursor-not-allowed" : "hover:underline"
              } ${currentBook === id ? "underline font-bold" : ""}`}
            >
              {name}
            </Link>
          )}
        </AccordionContent>
      ))}
    </>
  );
}
