import { useEffect } from "react";

import SearchForm from "@/components/SearchPage/SearchForm";
import SearchList from "@/components/SearchPage/SearchList";
import { useSearchStore } from "@/store/use-search-store";

export default function SearchPage() {
  const { selectedIndex } = useSearchStore();

  useEffect(() => {
    if (selectedIndex !== null) {
      const targetItem = document.querySelector(
        `li[data-search-index="${selectedIndex}"]`,
      );
      if (targetItem) {
        targetItem.scrollIntoView({
          behavior: "instant",
          block: "center",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <section className="space-y-4 py-6" aria-labelledby="search-page-title">
      <h1 id="search-page-title" className="text-xl font-bold">
        Поиск стихов
      </h1>
      <SearchForm />
      <SearchList />
    </section>
  );
}
