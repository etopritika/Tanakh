import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Chapter } from "@/lib/types";

interface AppPaginationProps {
  currentPage: number;
  subPage: number;
  chapters: Chapter[];
  sectionName: string;
  bookName: string;
}

export default function AppPagination({
  currentPage,
  subPage,
  chapters,
  sectionName,
  bookName,
}: AppPaginationProps) {
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.key === currentPage && chapter.subKey === subPage
  );

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === chapters.length - 1;

  const getPageHref = (index: number): string => {
    const { key, subKey } = chapters[index];
    const subPath = subKey > 1 ? `/${subKey}` : "";
    return `/${sectionName}/${bookName}/${key}${subPath}`;
  };

  const getButtonClassName = (isDisabled: boolean): string =>
    isDisabled
      ? "text-gray-400 cursor-not-allowed pointer-events-none"
      : "bg-brown-dark transition-colors hover:bg-brown-light";

  return (
    <Pagination className="text-white">
      <PaginationContent className="w-full flex items-center justify-between">
        <PaginationPrevious
          to={!isFirstPage ? getPageHref(currentIndex - 1) : "#"}
          className={getButtonClassName(isFirstPage)}
        >
          Previous
        </PaginationPrevious>

        <PaginationNext
          to={!isLastPage ? getPageHref(currentIndex + 1) : "#"}
          className={getButtonClassName(isLastPage)}
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
}
