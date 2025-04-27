import { Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SearchLink() {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");

  if (isSearchPage) return null;

  return (
    <Link
      to="/search"
      className="flex items-center px-3 py-0.5"
      aria-label="Перейти к поиску"
    >
      <Search aria-hidden="true" focusable="false" />
    </Link>
  );
}
