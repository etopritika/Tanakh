import { useCallback, useEffect, useState } from "react";

import ActionDropdown from "./actions/ActionDropdown";
import CommentsDropdown from "./actions/CommentsDropdown";
import { Card, CardContent, CardFooter } from "../../ui/card";

import { Verse } from "@/lib/types";
import { useFirestoreStore } from "@/store/use-firestore-store";
import { useSelectionStore } from "@/store/use-select-store";

export default function VerseCard({ verse }: { verse: Verse }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const verseId = `verse-${verse.id_chapter}-${verse?.id_chapter_two || 1}-${verse.poemNumber}`;
  const selectionId = `${verse.id_book}-${verse.id_chapter}-${verse.id_chapter_two || 1}-${verse.poemNumber}`;

  const verseMetadata = useFirestoreStore((state) => state.verses[verseId]);
  const verseComments = Object.values(
    useFirestoreStore((state) => state.comments[verseId]) ?? {},
  );
  const isCommentsLoaded = useFirestoreStore((state) => state.isCommentsLoaded);

  const docId = verseMetadata?.id;
  const highlightColor = verseMetadata?.highlightColor || "transparent";
  const hasComments = verseComments.length > 0;

  const verseHash = `#verse-${verse.poemNumber}`;

  const { isSelecting, verses, toggleVerseSelection } = useSelectionStore();

  const isSelected = !!verses[selectionId];

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
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 1000);
  };

  const handleVerseClick = () => {
    if (isSelecting) {
      toggleVerseSelection(selectionId, verse);
    }
  };

  return (
    <li id={verseHash.substring(1)}>
      <Card
        onClick={handleVerseClick}
        className={`bg-white shadow-md ${isSelected ? "bg-muted" : ""} ${
          isHighlighted ? "animate-pulse bg-muted text-white" : ""
        }`}
      >
        <CardContent
          className={`flex space-x-1 p-3 pl-1.5 text-base sm:space-x-2 sm:p-6 sm:text-lg ${
            hasComments ? "pb-0 sm:pb-0" : ""
          } `}
        >
          <strong className="text-xs leading-5 sm:text-sm">
            {verse.poemNumber}
          </strong>

          <ActionDropdown
            verse={verse}
            onCopy={handleCopy}
            highlightColor={highlightColor}
            docId={docId}
          >
            <div
              className={`flex cursor-pointer flex-col space-y-3 ${isSelecting ? "pointer-events-none" : ""}`}
            >
              <p
                style={{ backgroundColor: highlightColor }}
                className={`rounded leading-5`}
              >
                {verse.verse}
              </p>
              {verse.verse_ivrit && (
                <p
                  lang="he"
                  dir="rtl"
                  style={{ backgroundColor: highlightColor }}
                  className="rounded text-right"
                >
                  {verse.verse_ivrit}
                </p>
              )}
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
