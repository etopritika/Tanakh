import { useEffect, useState } from "react";

import CommentsDropdown from "./Comments-Dropdown";
import VerseActionsDropdown from "./Verse-Actions-Dropdown";
// import VerseContextMenu from "./Verse-Context-Menu";
import { Card, CardContent, CardFooter } from "../ui/card";

import { Verse } from "@/lib/types";
import { useFirestoreStore } from "@/store/use-firestore-store";

export default function VerseCard({ verse }: { verse: Verse }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;
  const verseMetadata = useFirestoreStore((state) => state.verses[verseId]);
  const verseComments = Object.values(
    useFirestoreStore((state) => state.comments[verseId]) ?? {},
  );

  const docId = verseMetadata?.id;

  const highlightColor = verseMetadata?.highlightColor || "transparent";

  const hasComments = Boolean(verse.comment) || verseComments.length > 0;

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
    // <VerseContextMenu
    //   verse={verse}
    //   onCopy={handleCopy}
    //   highlightColor={highlightColor}
    //   docId={docId}
    // >
    <li id={`verse-${verse.poemNumber}`}>
      <Card
        className={`bg-white shadow-md ${
          isHighlighted ? "animate-pulse bg-muted text-white" : ""
        }`}
      >
        <CardContent
          className={`flex space-x-2 p-4 sm:space-x-3 sm:p-6 ${hasComments ? "pb-0 sm:pb-0" : ""}`}
        >
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
            docId={docId}
          />
        </CardContent>
        {hasComments && (
          <CardFooter className="p-4 sm:p-6">
            <CommentsDropdown verse={verse} />
          </CardFooter>
        )}
      </Card>
    </li>
    // </VerseContextMenu>
  );
}
