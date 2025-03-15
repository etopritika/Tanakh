import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { bookNameMap } from "@/lib/types";

export default function BackToBooksLink() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length !== 3) {
    return null;
  }

  const bookKey = pathSegments[2];
  const bookName = bookNameMap[bookKey] || "Неизвестная книга";

  const backToBooksPath = `/books/${pathSegments[1]}`;

  return (
    <Link
      to={backToBooksPath}
      className="flex items-center px-4 py-2 text-text"
    >
      <ChevronLeft className="mr-2" />
      {bookName}
    </Link>
  );
}
