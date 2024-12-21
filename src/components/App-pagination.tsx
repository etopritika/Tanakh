import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPagination {
  currentPage: number | 1;
  totalPages: number | 1;
  sectionName: string;
  bookName: string;
}

export default function AppPagination({
  currentPage,
  totalPages,
  sectionName,
  bookName,
}: AppPagination) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const getPageHref = (page: number) => `/${sectionName}/${bookName}/${page}`;

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
