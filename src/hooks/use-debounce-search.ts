import { booksMap, SearchFormData, Verse } from "@/lib/types";
import { useSearchStore } from "@/store/use-search-store";
import debounce from "lodash.debounce";
import { useEffect } from "react";

export const useDebouncedSearch = () => {
  const { setQuery, setResults, setError, setIsSearchComplete } =
    useSearchStore();
  const debouncedSearch = debounce(async (data: SearchFormData) => {
    setQuery(data.query);

    const sectionsToSearch = Object.values(booksMap).flat();

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
      setIsSearchComplete(true);
    } catch {
      setError("Произошла ошибка при поиске.");
      setResults([]);
      setIsSearchComplete(true);
    }
  }, 800);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return debouncedSearch;
};
