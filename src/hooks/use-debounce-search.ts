import { booksMap, SearchFormData, Verse } from "@/lib/types";
import debounce from "lodash.debounce";
import { useEffect } from "react";

export const useDebouncedSearch = (
  sectionName: string | undefined,
  setResults: (results: Verse[]) => void,
  setError: (error: string | null) => void
) => {
  const debouncedSearch = debounce(async (data: SearchFormData) => {
    if (!data.query.trim()) {
      setResults([]);
      return;
    }

    const sectionsToSearch = sectionName
      ? booksMap[sectionName]
      : Object.values(booksMap).flat(1);

    if (!sectionsToSearch || sectionsToSearch.length === 0) {
      setError("Розділ не знайдено або розділи відсутні.");
      setResults([]);
      return;
    }

    try {
      const allVerses = sectionsToSearch.flat();
      const results = allVerses.filter(
        (verse: Verse) =>
          verse.verse.toLowerCase().includes(data.query.toLowerCase()) ||
          (verse.verse_ivrit &&
            verse.verse_ivrit.toLowerCase().includes(data.query.toLowerCase()))
      );

      setResults(results);
      setError(null);
    } catch {
      setError("Сталася помилка під час пошуку.");
      setResults([]);
    }
  }, 500);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return debouncedSearch;
};
