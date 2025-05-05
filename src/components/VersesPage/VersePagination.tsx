import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Chapter } from "@/lib/types";

interface VersePaginationProps {
  currentPage: number;
  subPage: number;
  chapters: Chapter[];
  sectionName: string;
  bookName: string;
}

export default function VersePagination({
  currentPage,
  subPage,
  chapters,
  sectionName,
  bookName,
}: VersePaginationProps) {
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.key === currentPage && chapter.subKey === subPage,
  );

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === chapters.length - 1;

  const getPageHref = (index: number): string => {
    const { key, subKey } = chapters[index];
    const subPath = subKey > 1 ? `/${subKey}` : "";
    return `/books/${sectionName}/${bookName}/${key}${subPath}`;
  };

  const getButtonClassName = (isDisabled: boolean): string =>
    isDisabled
      ? "pointer-events-none cursor-not-allowed text-gray-400"
      : "bg-brown-dark";

  return (
    <Pagination className="text-white" aria-label="Навигация по главам">
      <PaginationContent className="flex w-full items-center justify-between">
        <li>
          <PaginationPrevious
            to={!isFirstPage ? getPageHref(currentIndex - 1) : "#"}
            className={getButtonClassName(isFirstPage)}
            aria-label="Предыдущая глава"
            aria-disabled={isFirstPage}
          >
            Previous
          </PaginationPrevious>
        </li>

        <li>
          <PaginationNext
            to={!isLastPage ? getPageHref(currentIndex + 1) : "#"}
            className={getButtonClassName(isLastPage)}
            aria-label="Следующая глава"
            aria-disabled={isLastPage}
          >
            Next
          </PaginationNext>
        </li>
      </PaginationContent>
    </Pagination>
  );
}
