import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { BookPathMap, Verse } from "@/lib/types";
import { useSearchStore } from "@/store/use-search-store";

interface SearchCardProps {
  verse: Verse;
  index: number;
}

export default function SearchCard({ verse, index }: SearchCardProps) {
  const { selectedIndex, setSelectedIndex } = useSearchStore();
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    if (selectedIndex === index) {
      setIsAnimationActive(true);

      const timer = setTimeout(() => {
        setIsAnimationActive(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [selectedIndex, index]);

  const idChapterTwo = verse.id_chapter_two || 1;
  const isSubChapter =
    idChapterTwo > 1 ? `${verse.id_chapter}/${idChapterTwo}` : verse.id_chapter;

  const bookPath = BookPathMap[verse.id_book];
  const to = `/books/${bookPath.section}/${bookPath.bookName}/${isSubChapter}#verse-${verse.poemNumber}`;
  const isHighlighted = selectedIndex === index;

  const cardClasses = `bg-white shadow-md ${
    isHighlighted && isAnimationActive
      ? "animate-pulse bg-muted text-white"
      : ""
  }`;

  const verseLabelId = `verse-heading-${index}`;
  const verseContentId = `verse-content-${index}`;

  return (
    <li
      role="listitem"
      onClick={() => setSelectedIndex(index)}
      data-search-index={index}
    >
      <Link
        to={to}
        aria-labelledby={verseLabelId}
        aria-describedby={verseContentId}
        aria-current={isHighlighted ? "true" : undefined}
        className="group"
      >
        <Card
          className={`${cardClasses} group-focus-visible:ring-[1.5px] group-focus-visible:ring-black`}
        >
          <CardHeader>
            <CardTitle id={verseLabelId} className="text-sm">
              {verse.name}{" "}
              <span className="font-bold">
                {verse.chapter.split(" (")[0].trim()}
              </span>{" "}
              <span className="font-normal">
                ({verse.chapter.split(" (")[1]?.trim() || ""}
              </span>{" "}
              <span
                className="font-normal"
                aria-label={`Номер главы: ${verse.id_chapter}`}
              >
                {verse.id_chapter}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent id={verseContentId} className="flex space-x-2 text-sm">
            <p
              className="font-bold"
              aria-label={`Номер стиха: ${verse.poemNumber}`}
            >
              {verse.poemNumber}
            </p>
            <div className="w-full space-y-2">
              <p>{verse.verse}</p>
              {verse.verse_ivrit && (
                <p className="rtl text-right" lang="he" dir="rtl">
                  {verse.verse_ivrit}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
