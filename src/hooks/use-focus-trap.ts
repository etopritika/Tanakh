import { useEffect, useRef } from "react";

export function useFocusTrap(
  ref: React.RefObject<HTMLElement>,
  active: boolean,
) {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      previouslyFocusedElementRef.current =
        document.activeElement as HTMLElement;
    }

    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [ref, active]);
}
