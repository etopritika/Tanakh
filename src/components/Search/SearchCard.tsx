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
      }, 3000);

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

  return (
    <li onClick={() => setSelectedIndex(index)} data-search-index={index}>
      <Link to={to}>
        <Card className={cardClasses}>
          <CardHeader>
            <CardTitle className="text-sm">
              {verse.name}{" "}
              <span className="font-bold">
                {verse.chapter.split(" (")[0].trim()}
              </span>{" "}
              <span className="font-normal">
                ({verse.chapter.split(" (")[1]?.trim() || ""}
              </span>{" "}
              <span className="font-normal">{verse.id_chapter}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2 text-sm">
            <span className="font-bold">{verse.poemNumber}</span>
            <div className="w-full space-y-2">
              <p>{verse.verse}</p>
              <p className="rtl text-right">{verse.verse_ivrit}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}
