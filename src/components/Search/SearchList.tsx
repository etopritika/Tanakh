import SearchCard from "./SearchCard";

import { useSearchStore } from "@/store/use-search-store";

export default function SearchList() {
  const { storeResults, error, isSearchComplete } = useSearchStore();

  const resultsMessage = `${
    storeResults.length === 1 ? "Совпадение:" : "Совпадений:"
  } ${storeResults.length}`;

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (storeResults.length === 0 && isSearchComplete) {
    return (
      <div className="flex justify-center">
        <span>Нет результатов.</span>
      </div>
    );
  }

  return (
    <section>
      {isSearchComplete && (
        <span className="text-gray-500">{resultsMessage}</span>
      )}
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
