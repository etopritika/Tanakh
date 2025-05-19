import SearchCard from "./SearchCard";

import { useSearchStore } from "@/store/use-search-store";

export default function SearchList() {
  const { storeResults, error, isSearchComplete } = useSearchStore();

  const resultsMessage = `${
    storeResults.length === 1 ? "Совпадение:" : "Совпадений:"
  } ${storeResults.length}`;

  if (error) {
    return (
      <p role="alert" className="text-danger">
        {error}
      </p>
    );
  }

  if (storeResults.length === 0 && isSearchComplete) {
    return (
      <div className="flex justify-center" role="status">
        <p>Нет результатов.</p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="search-results-heading"
      aria-live="polite"
      aria-atomic="true"
    >
      <h2 id="search-results-heading" className="sr-only">
        Результаты поиска
      </h2>

      {isSearchComplete && <p className="text-gray-500">{resultsMessage}</p>}
      <ul className="mt-1 space-y-4">
        {storeResults.map((verse, index) => (
          <SearchCard
            key={`${verse.id_book}-${verse.id_chapter}-${verse.poemNumber}`}
            verse={verse}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
}
