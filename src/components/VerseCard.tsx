import { useEffect, useState } from "react";
import { Verse } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

export default function VerseCard({ verse }: { verse: Verse }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === `#verse-${verse.poemNumber}`) {
      setIsHighlighted(true);

      const element = document.getElementById(`verse-${verse.poemNumber}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      const timer = setTimeout(() => setIsHighlighted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [verse.poemNumber]);

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
