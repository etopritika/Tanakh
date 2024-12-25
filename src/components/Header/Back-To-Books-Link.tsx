import { sectionNameMap } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BackToBooksLink() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length !== 2) {
    return null;
  }

  const bookKey = pathSegments[0];
  const bookName = sectionNameMap[bookKey] || "Неизвестная книга";

  const backToBooksPath = `/${pathSegments[0]}`;

  return (
    <Link
      to={backToBooksPath}
      className="px-4 py-2 text-text flex items-center"
    >
      <ChevronLeft />
      {bookName}
    </Link>
  );
}
