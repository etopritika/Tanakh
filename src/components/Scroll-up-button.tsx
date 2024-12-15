import { useState, useEffect } from "react";
import { ChevronsUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollUpButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <Button
        onClick={handleScrollUp}
        aria-label="Scroll to top"
        className="fixed bottom-2 right-2 z-50 rounded-lg border-none bg-brown-dark py-2 px-3 md:p-4"
      >
        <ChevronsUp className="text-white" />
      </Button>
    )
  );
}
