import { ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "../ui/button";

export default function SearchBackLink() {
  const location = useLocation();

  if (location.pathname !== "/search") {
    return null;
  }

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Button
      type="button"
      onClick={handleGoBack}
      variant="ghost"
      className="flex items-center px-4 py-2 text-text"
      aria-label="Вернуться на предыдущую страницу"
    >
      <ChevronLeft aria-hidden="true" focusable="false" />
      Назад
    </Button>
  );
}
