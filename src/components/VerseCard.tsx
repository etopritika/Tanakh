import { useEffect, useState } from "react";
import { Verse } from "@/lib/types";
import { Card, CardContent } from "./ui/card";

export default function VerseCard({ verse }: { verse: Verse }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const hash = window.location.hash;
  useEffect(() => {
    if (hash === `#verse-${verse.poemNumber}`) {
      setIsHighlighted(true);

      const element = document.getElementById(`verse-${verse.poemNumber}`);
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const offset =
          elementTop - window.innerHeight / 2 + element.clientHeight / 2;

        window.scrollTo({
          top: window.scrollY + offset,
          behavior: "instant",
        });
      }

      const timer = setTimeout(() => setIsHighlighted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [verse.poemNumber, hash]);

  return (
    <li id={`verse-${verse.poemNumber}`}>
      <Card
        className={`bg-white shadow-md ${
          isHighlighted ? "animate-pulse bg-muted text-white" : ""
        }`}
      >
        <CardContent className="pt-6 flex space-x-3">
          <span className="font-bold">{verse.poemNumber}</span>
          <div className="space-y-2 w-full">
            <p>{verse.verse}</p>
            <p className="rtl text-right">{verse.verse_ivrit}</p>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
