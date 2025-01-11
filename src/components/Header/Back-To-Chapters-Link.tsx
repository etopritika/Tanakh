import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { bookNameMap } from "@/lib/types";

export default function BackToChaptersLink() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length < 3) {
    return null;
  }

  const bookKey = pathSegments[1];
  const chapterKey = pathSegments[2];
  const chapterName = bookNameMap[bookKey] || "Неизвестная глава";

  const backToChaptersPath = `/${pathSegments[0]}/${pathSegments[1]}`;

  return (
    <Link
      to={backToChaptersPath}
      className="flex items-center px-4 py-2 text-text"
    >
      <ChevronLeft className="mr-2" />
      {chapterName} {chapterKey}
    </Link>
  );
}
