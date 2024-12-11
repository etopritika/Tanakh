import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import SearchButton from "./search-button";

export default function Header() {
  const location = useLocation();
  const pathSegments: string[] = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <header className="container mx-auto px-4">
      <div className="flex items-center space-x-8">
        <Breadcrumbs pathSegments={pathSegments} />
        <SearchButton pathSegments={pathSegments} />
      </div>
    </header>
  );
}
