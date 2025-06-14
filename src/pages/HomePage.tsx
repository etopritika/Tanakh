import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import HomepageVerseCard from "@/components/Homepage/HomepageVerseCard";
import HomepageVerseList from "@/components/Homepage/HomepageVerseList";
import { groupVersesByChapterSorted } from "@/components/Homepage/utils/groupVersesByChapterSorted";
import { toast } from "@/hooks/use-toast";
import { fetchHomepageVerses } from "@/lib/api/fetchFirestoreData";
import { useHomepageVersesStore } from "@/store/use-homepage-verses";

export default function HomePage() {
  const { verses, setVerses } = useHomepageVersesStore();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [setVerses]);

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <div className="flex space-x-2" role="status">
          <LoaderCircle
            className="animate-spin"
            aria-hidden="true"
            focusable="false"
          />
          <p>Загрузка стихов...</p>
        </div>
      </section>
    );
  }

  if (verses.length === 0) {
    return (
      <section className="flex h-full items-center justify-center py-6">
        <p className="text-danger" role="status">
          Нет добавленных стихов.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center py-6">
      <h1 className="sr-only">Главная страница</h1>
      <div className="space-y-6">
        {Object.entries(groupVersesByChapterSorted(verses)).map(
          ([chapterId, versesInGroup]) => {
            return (
              <HomepageVerseList key={chapterId} versesInGroup={versesInGroup}>
                {versesInGroup.map((verse) => (
                  <HomepageVerseCard
                    key={`${verse.id_book}-${verse.id_chapter}-${verse.id_chapter_two ?? 1}-${verse.poemNumber}`}
                    verse={verse}
                  />
                ))}
              </HomepageVerseList>
            );
          },
        )}
      </div>
    </section>
  );
}
