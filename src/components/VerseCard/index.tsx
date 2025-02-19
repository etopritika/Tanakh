import { useEffect, useState } from "react";

import CommentsDropdown from "./Comments-Dropdown";
import VerseActionsDropdown from "./Verse-Actions-Dropdown";
import VerseContextMenu from "./Verse-Context-Menu";
import { Card, CardContent, CardFooter } from "../ui/card";

import { Verse } from "@/lib/types";
import { useFirestoreStore } from "@/store/use-firestore-store";

export default function VerseCard({ verse }: { verse: Verse }) {
  const { verses } = useFirestoreStore();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;
  const verseData = verses.find((v) => v.id === verseId);
  const highlightColor = verseData?.highlightColor || "transparent";

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

      const timer = setTimeout(() => setIsHighlighted(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [verse.poemNumber, hash]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <VerseContextMenu
      verse={verse}
      onCopy={handleCopy}
      highlightColor={highlightColor}
    >
      <li id={`verse-${verse.poemNumber}`}>
        <Card
          className={`bg-white shadow-md ${
            isHighlighted ? "animate-pulse bg-muted text-white" : ""
          }`}
        >
          <CardContent className="flex space-x-3 pb-0 pt-6">
            <span className="font-bold">{verse.poemNumber}</span>
            <div className="w-full space-y-2">
              <p
                style={{ backgroundColor: isCopied ? "" : highlightColor }}
                className={`rounded ${isCopied ? "animate-pulse bg-muted text-white" : ""}`}
              >
                {verse.verse}
              </p>
              <p
                style={{ backgroundColor: isCopied ? "" : highlightColor }}
                className={`rtl rounded text-right ${isCopied ? "animate-pulse bg-muted text-white" : ""}`}
              >
                {verse.verse_ivrit}
              </p>
            </div>
            <VerseActionsDropdown
              verse={verse}
              onCopy={handleCopy}
              highlightColor={highlightColor}
            />
          </CardContent>
          <CardFooter>
            <CommentsDropdown verse={verse} />
          </CardFooter>
        </Card>
      </li>
    </VerseContextMenu>
  );
}
