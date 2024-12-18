import { useEffect, useState } from "react";
import { Verse } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

export default function VerseCard({
  verse,
  scrollRef,
}: {
  verse: Verse;
  scrollRef: React.RefObject<HTMLElement>;
}) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === `#verse-${verse.poemNumber}`) {
      setIsHighlighted(true);
      const container = scrollRef.current;
      const element = document.getElementById(`verse-${verse.poemNumber}`);
      if (container && element) {
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = element.getBoundingClientRect().top;

        const offset =
          elementTop -
          containerTop -
          container.clientHeight / 2 +
          element.clientHeight / 2;

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      }

      const timer = setTimeout(() => setIsHighlighted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [verse.poemNumber, scrollRef]);

  return (
    <li id={`verse-${verse.poemNumber}`}>
      <Card
        className={`bg-white shadow-lg ${
          isHighlighted ? "animate-pulse bg-muted text-white" : ""
        }`}
      >
        <CardContent className="pt-6 relative">
          <span className="absolute top-2 right-3">{verse.poemNumber}</span>
          <div className="space-y-2">
            <p>{verse.verse}</p>
            <p>{verse.verse_ivrit}</p>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
