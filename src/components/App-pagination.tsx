import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation } from "react-router-dom";

interface MoviePaginationProps {
  currentPage: number | 1;
  totalPages: number | 1;
  sectionName: string;
  bookName: string;
  chapterId?: string;
}

export default function AppPagination({
  currentPage,
  totalPages,
  sectionName,
  bookName,
  chapterId = "1",
}: MoviePaginationProps) {
  const { pathname } = useLocation();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const routes = {
    search: (page: number) => `/search/${page}`,
    chapters: (page: number) =>
      `/sections/${sectionName}/books/${bookName}/chapters/${page}`,
    verses: (page: number) =>
      `/sections/${sectionName}/books/${bookName}/chapter/${chapterId}/verses/${page}`,
  };

  const getPageHref = (page: number) => {
    if (pathname.includes("search")) {
      return routes.search(page);
    }
    if (pathname.includes("chapters")) {
      return routes.chapters(page);
    }
    return routes.verses(page);
  };

  const activeClass =
    "pointer-events-none bg-white text-black border-[1px] border-brown-dark rounded-md";
  const inactiveClass = "bg-brown-dark transition-colors";

  const createPageLink = (
    page: number,
    isActive: boolean,
    additionalClass = "",
    hiddenSuffix = ""
  ) => (
    <PaginationItem
      key={`page-${page}${hiddenSuffix}`}
      className={additionalClass}
    >
      <PaginationLink
        to={getPageHref(page)}
        isActive={isActive}
        className={isActive ? activeClass : inactiveClass}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );

  const renderPageLinks = () => {
    const pages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(createPageLink(i, i === currentPage));
      }
    } else {
      pages.push(
        createPageLink(1, currentPage === 1, "hidden sm:flex", "-hidden")
      );

      if (currentPage > 4) {
        pages.push(
          <PaginationEllipsis
            key={`start-ellipsis-${currentPage}`}
            className="hidden sm:flex text-text"
          />
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(createPageLink(i, i === currentPage));
      }

      if (currentPage <= 4) {
        pages.unshift(createPageLink(1, currentPage === 1, "sm:hidden"));
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationEllipsis
            key={`end-ellipsis-${currentPage}`}
            className="hidden sm:flex text-text"
          />
        );
      }

      pages.push(
        createPageLink(
          totalPages,
          currentPage === totalPages,
          "hidden sm:flex",
          "-hidden"
        )
      );

      if (currentPage >= totalPages - 2) {
        pages.push(
          createPageLink(totalPages, currentPage === totalPages, "sm:hidden")
        );
      }
    }

    return pages;
  };

  const buttonClassName = (isDisabled: boolean) =>
    isDisabled
      ? "text-gray-400 cursor-not-allowed"
      : "bg-brown-dark transition-colors";

  return (
    <Pagination className="text-white">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={!isFirstPage ? getPageHref(currentPage - 1) : "#"}
            className={buttonClassName(isFirstPage)}
          />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext
            to={!isLastPage ? getPageHref(currentPage + 1) : "#"}
            className={buttonClassName(isLastPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
