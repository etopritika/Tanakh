import { useCallback, useEffect, useState } from "react";

import ActionDropdown from "./Action-Dropdown";
import CommentsDropdown from "./Comments-Dropdown";
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
  const isCommentsLoaded = useFirestoreStore((state) => state.isCommentsLoaded);

  const docId = verseMetadata?.id;
  const highlightColor = verseMetadata?.highlightColor || "transparent";
  const hasComments = verseComments.length > 0;

  const verseHash = `#verse-${verse.poemNumber}`;

  const scrollToVerse = useCallback(() => {
    if (window.location.hash !== verseHash) return;

    const element = document.getElementById(verseHash.substring(1));
    if (element) {
      setIsHighlighted(true);
      element.scrollIntoView({
        behavior: "instant",
        block: "center",
      });

      setTimeout(() => setIsHighlighted(false), 1500);
    }
  }, [verseHash]);

  useEffect(() => {
    scrollToVerse();
  }, [scrollToVerse, isCommentsLoaded]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <li id={verseHash.substring(1)}>
      <Card
        className={`bg-white shadow-md ${
          isHighlighted ? "animate-pulse bg-muted text-white" : ""
        }`}
      >
        <CardContent
          className={`flex space-x-1 p-3 pl-1.5 text-base sm:space-x-2 sm:p-6 sm:text-lg ${
            hasComments ? "pb-0 sm:pb-0" : ""
          }`}
        >
          <span className="text-xs font-bold leading-5 sm:text-sm">
            {verse.poemNumber}
          </span>

          <ActionDropdown
            verse={verse}
            onCopy={handleCopy}
            highlightColor={highlightColor}
            docId={docId}
          >
            <div className="flex cursor-pointer flex-col space-y-3">
              <p
                style={{ backgroundColor: isCopied ? "" : highlightColor }}
                className={`rounded leading-5 ${
                  isCopied ? "animate-pulse bg-muted text-white" : ""
                }`}
              >
                {verse.verse}
              </p>
              <p
                style={{ backgroundColor: isCopied ? "" : highlightColor }}
                className={`rtl rounded text-right ${
                  isCopied ? "animate-pulse bg-muted text-white" : ""
                }`}
              >
                {verse.verse_ivrit}
              </p>
            </div>
          </ActionDropdown>
        </CardContent>
        {hasComments && (
          <CardFooter className="p-3 sm:p-6">
            <CommentsDropdown verse={verse} />
          </CardFooter>
        )}
      </Card>
    </li>
  );
}
