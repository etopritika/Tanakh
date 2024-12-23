import { bookNameMap } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BackToChaptersLink() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length !== 3) {
    return null;
  }

  const bookKey = pathSegments[1];
  const chapterKey = pathSegments[2];
  const bookName = bookNameMap[bookKey] || "Неизвестная книга";

  const backToChaptersPath = `/${pathSegments[0]}/${pathSegments[1]}`;

  return (
    <Link
      to={backToChaptersPath}
      className="px-4 py-2 text-text hover:underline flex items-center"
    >
      <ChevronLeft />
      {bookName} : {chapterKey}
    </Link>
  );
}
