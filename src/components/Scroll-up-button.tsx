import { useState, useEffect } from "react";
import { ChevronsUp } from "lucide-react";
import { Button } from "./ui/button";

interface ScrollUpButtonProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export default function ScrollUpButton({ containerRef }: ScrollUpButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollUp = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollTarget = containerRef?.current || window;

    const toggleVisibility = () => {
      const scrollTop = containerRef?.current
        ? containerRef.current.scrollTop
        : window.scrollY;
      setIsVisible(scrollTop > 300);
    };

    scrollTarget.addEventListener("scroll", toggleVisibility);

    return () => {
      scrollTarget.removeEventListener("scroll", toggleVisibility);
    };
  }, [containerRef]);

  return (
    isVisible && (
      <Button
        onClick={handleScrollUp}
        aria-label="Scroll to top"
        className="fixed bottom-4 right-4 z-50 rounded-lg border-none bg-brown-dark p-4 md:p-6"
      >
        <ChevronsUp className="text-white" />
      </Button>
    )
  );
}
