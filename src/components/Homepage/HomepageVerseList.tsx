import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { getRedirectPath } from "./utils/getRedirectPath";
import ModalContainer from "../Modals/ModalContainer";
import DeleteAllVersesConfirmation from "../Modals/VerseActions/DeleteAllVersesConfirmation";
import { Button } from "../ui/button";

import { BookPathMap, SectionName, sectionNameMap, Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useUserStore } from "@/store/use-user-store";

interface HomepageVerseListProps {
  children: React.ReactNode;
  firstVerse: Verse;
  isFirstGroup: boolean;
}

export default function HomepageVerseList({
  children,
  firstVerse,
  isFirstGroup,
}: HomepageVerseListProps) {
  const { setOpen } = useModal();
  const { role } = useUserStore();
  const isAdmin = role === "admin";

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
        <DeleteAllVersesConfirmation />
      </ModalContainer>,
    );
  };

  return (
    <article className="space-y-2">
      <div className="flex justify-between">
        <h2 className="flex items-center gap-2">
          <strong>
            {sectionName && <span>{sectionName}</span>} {fullChapterName.main}
          </strong>
          {fullChapterName.comment && <span> ({fullChapterName.comment})</span>}
          <span>{fullChapterName.id}</span>
          <Tooltip>
            <TooltipTrigger className="px-2">
              <Link to={redirectPath} className="text-blue-600">
                <ChevronsRight />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>Перейти к главе</p>
            </TooltipContent>
          </Tooltip>
        </h2>
        {isAdmin && isFirstGroup && (
          <Button
            onClick={handleDeleteAll}
            className="ml-auto bg-danger text-white"
            size="sm"
          >
            Удалить все стихи
          </Button>
        )}
      </div>
      <ul className="space-y-4">{children}</ul>
    </article>
  );
}
