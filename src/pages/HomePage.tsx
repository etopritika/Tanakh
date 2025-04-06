import { ChevronsRight, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HomepageVerseCard from "@/components/Homepage/HomepageVerseCard";
import HomepageVerseList from "@/components/Homepage/HomepageVerseList";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { fetchHomepageVerses } from "@/lib/api/fetchFirestoreData";
import { BookPathMap, Verse } from "@/lib/types";

const getRedirectPath = (verse: Verse | undefined): string => {
  if (!verse) return "";

  const { id_book, id_chapter, id_chapter_two } = verse;
  const bookPath = BookPathMap[id_book];

  if (!bookPath) {
    console.error(`BookPathMap не содержит запись для id_book: ${id_book}`);
    return "";
  }

  const { section, bookName } = bookPath;
  return `books/${section}/${bookName}/${id_chapter}${id_chapter_two === 2 ? `/${id_chapter_two}` : ""}`;
};

export default function HomePage() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const redirectPath = getRedirectPath(verses[0]);

  const fullChapterName = (() => {
    const [main, comment] = (verses[0]?.chapter || "").split(" (");
    return {
      main: main.trim(),
      comment: comment ? comment.replace(")", "").trim() : "",
    };
  })();

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const data = await fetchHomepageVerses();
        setVerses(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Неизвестная ошибка";
        toast({
          title: "Ошибка",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerses();
  }, []);

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <div className="flex space-x-2">
          <LoaderCircle className="animate-spin" />
          <p>Загрузка стихов...</p>
        </div>
      </section>
    );
  }

  if (verses.length === 0) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <strong className="text-danger">Нет добавленных стихов.</strong>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center space-y-2 py-6">
      <h1 className="flex items-center space-x-2">
        <strong>{fullChapterName.main}</strong>
        {fullChapterName.comment && <span> ({fullChapterName.comment})</span>}
        <Tooltip>
          <TooltipTrigger>
            <Link to={redirectPath} className="text-blue-600">
              <ChevronsRight />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-white">
            <p>Перейти</p>
          </TooltipContent>
        </Tooltip>
      </h1>
      <HomepageVerseList>
        {verses.map((verse) => (
          <HomepageVerseCard
            key={`${verse.id_book}-${verse.id_chapter}-${verse.id_chapter_two || 1}-${verse.poemNumber}`}
            verse={verse}
            setVerses={setVerses}
          />
        ))}
      </HomepageVerseList>
    </section>
  );
}
