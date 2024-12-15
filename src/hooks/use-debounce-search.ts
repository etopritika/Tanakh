import bemidbar from "@/data/tora/obj-bemidbar";
import beresheet from "@/data/tora/obj-beresheet";
import dvarim from "@/data/tora/obj-dvarim";
import schmot from "@/data/tora/obj-schmot";
import vaikra from "@/data/tora/obj-vaikra";

import { Verse } from "@/lib/types";
import { SearchFormData } from "@/pages/SearchPage";
import debounce from "lodash.debounce";
import { useEffect } from "react";

const booksMap: Record<string, Verse[][]> = {
  tora: [beresheet, schmot, vaikra, bemidbar, dvarim],
};

export const useDebouncedSearch = (
  sectionName: string | undefined,
  setResults: (results: Verse[]) => void,
  setError: (error: string | null) => void
) => {
  const debouncedSearch = debounce((data: SearchFormData) => {
    if (!data.query.trim()) {
      setResults([]);
      return;
    }

    if (!sectionName || !booksMap[sectionName]) {
      setError("Некорректное имя раздела или раздел отсутствует.");
      setResults([]);
      return;
    }

    const books = booksMap[sectionName];
    const results = [];

    for (const book of books) {
      const matches = book.filter(
        (verse: Verse) =>
          verse.verse.toLowerCase().includes(data.query.toLowerCase()) ||
          (verse.verse_ivrit &&
            verse.verse_ivrit.toLowerCase().includes(data.query.toLowerCase()))
      );
      results.push(...matches);
    }

    setResults(results);
    setError(null);
  }, 1000);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return debouncedSearch;
};
