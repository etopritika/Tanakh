import { useState, useEffect } from "react";
import { ChevronsUp } from "lucide-react";
import { Button } from "./ui/button";

interface ScrollUpButtonProps {
  scrollRef: React.RefObject<HTMLElement>;
}

export default function ScrollUpButton({ scrollRef }: ScrollUpButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      console.warn("Scroll container is not yet available.");
      return;
    }

    const toggleVisibility = () => {
      setIsVisible((container.scrollTop ?? 0) > 300);
    };

    container.addEventListener("scroll", toggleVisibility);

    return () => container.removeEventListener("scroll", toggleVisibility);
  }, [scrollRef]);

  const handleScrollUp = () =>
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  return isVisible ? (
    <Button
      onClick={handleScrollUp}
      aria-label="Scroll to top"
      className="fixed bottom-2 right-2 z-50 rounded-lg border-none bg-brown-dark py-2 px-3 md:p-4"
    >
      <ChevronsUp className="text-white" />
    </Button>
  ) : null;
}
