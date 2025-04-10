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
  console.log("fullChapterName", fullChapterName);
  const handleDeleteAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(
      <ModalContainer>
        <DeleteGroupConfirmation versesInGroup={versesInGroup} />
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
        {isAdmin && (
          <Tooltip>
            <TooltipTrigger onClick={handleDeleteAll} className="ml-auto p-2">
              <X className="text-danger" />
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
