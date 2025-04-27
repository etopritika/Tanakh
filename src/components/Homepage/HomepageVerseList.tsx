import { ChevronsRight, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { getRedirectPath } from "./utils/getRedirectPath";
import ModalContainer from "../Modals/ModalContainer";
import DeleteGroupConfirmation from "../Modals/VerseActions/DeleteGroupConfirmation";

import { BookPathMap, SectionName, sectionNameMap, Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useUserStore } from "@/store/use-user-store";

interface HomepageVerseListProps {
  children: React.ReactNode;
  versesInGroup: Verse[];
}

export default function HomepageVerseList({
  children,
  versesInGroup,
}: HomepageVerseListProps) {
  const { setOpen } = useModal();
  const { role } = useUserStore();
  const isAdmin = role === "admin";
  const firstVerse = versesInGroup[0];
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

  const handleDeleteAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(
      <ModalContainer>
        <DeleteGroupConfirmation versesInGroup={versesInGroup} />
      </ModalContainer>,
    );
  };

  const safeChapterId = firstVerse?.chapter
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <article className="space-y-2" aria-labelledby={`group-${safeChapterId}`}>
      <div className="flex justify-between">
        <h2 id={`group-${safeChapterId}`} className="flex items-center gap-2">
          <span>
            <strong>
              {sectionName && `${sectionName}:`} {fullChapterName.main}
            </strong>
            {fullChapterName.comment && ` (${fullChapterName.comment})`}{" "}
            <span>{fullChapterName.id}</span>
          </span>

          <Tooltip>
            <TooltipTrigger className="px-2" asChild>
              <Link
                to={redirectPath}
                className="text-blue-600"
                aria-label="Перейти к главе"
              >
                <ChevronsRight aria-hidden="true" focusable="false" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>Перейти к главе</p>
            </TooltipContent>
          </Tooltip>
        </h2>
        {isAdmin && (
          <Tooltip>
            <TooltipTrigger
              onClick={handleDeleteAll}
              className="ml-auto p-2"
              aria-label="Удалить группу стихов"
            >
              <X className="text-danger" aria-hidden="true" focusable="false" />
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>Удалить группу</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <ul className="space-y-4">{children}</ul>
    </article>
  );
}
