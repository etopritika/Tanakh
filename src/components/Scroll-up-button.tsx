import { ChevronsUp } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";

export default function ScrollUpButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
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
        className="fixed bottom-14 right-4 z-40 rounded-full border-none bg-brown-dark transition-colors hover:bg-brown-light md:p-6"
      >
        <ChevronsUp className="text-white" />
      </Button>
    )
  );
}
