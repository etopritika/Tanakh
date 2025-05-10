import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { bookNameMap, SectionName, sectionNameMap } from "@/lib/types";

export default function BackToBooksLink() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length !== 3) {
    return null;
  }

  const sectionKey = pathSegments[1];
  const sectionName = sectionNameMap[sectionKey as SectionName] || "Раздел";
  const bookKey = pathSegments[2];
  const bookName = bookNameMap[bookKey] || "Неизвестная книга";

  const backToBooksPath = `/books/${pathSegments[1]}`;

  return (
    <Link
      to={backToBooksPath}
      className="flex items-center px-4 py-2 text-text"
      aria-label={`Вернуться к списку книг раздела: ${sectionName}`}
    >
      <ChevronLeft aria-hidden="true" focusable="false" className="mr-2" />
      {bookName}
    </Link>
  );
}
