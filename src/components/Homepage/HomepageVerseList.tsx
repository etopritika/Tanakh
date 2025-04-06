import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { getRedirectPath } from "./utils/getRedirectPath";

import { BookPathMap, SectionName, sectionNameMap, Verse } from "@/lib/types";

export default function HomepageVerseList({
  children,
  firstVerse,
}: {
  children: React.ReactNode;
  firstVerse: Verse;
}) {
  const redirectPath = getRedirectPath(firstVerse);
  const sectionName =
    firstVerse.id_book > 4
      ? sectionNameMap[BookPathMap[firstVerse.id_book].section as SectionName]
      : null;

  const fullChapterName = (() => {
    const [main, comment] = (firstVerse?.chapter || "").split(" (");
    return {
      main: main.trim(),
      comment: comment ? comment.replace(")", "").trim() : "",
      id: firstVerse?.id_chapter,
    };
  })();

  return (
    <article className="space-y-2">
      <h2 className="flex items-center gap-2">
        <strong>
          {sectionName && <span>{sectionName}</span>} {fullChapterName.main}
        </strong>
        {fullChapterName.comment && <span> ({fullChapterName.comment})</span>}
        <span>{fullChapterName.id}</span>
        <Tooltip>
          <TooltipTrigger>
            <Link to={redirectPath} className="text-blue-600">
              <ChevronsRight />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-white">
            <p>Перейти к главе</p>
          </TooltipContent>
        </Tooltip>
      </h2>
      <ul className="space-y-4">{children}</ul>
    </article>
  );
}
