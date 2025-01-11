import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SearchBackLink() {
  const location = useLocation();

  if (location.pathname !== "/search") {
    return null;
  }

  return (
    <Link
      to={"#"}
      onClick={() => window.history.back()}
      className="flex items-center px-4 py-2 text-text"
    >
      <ChevronLeft /> Назад
    </Link>
  );
}
