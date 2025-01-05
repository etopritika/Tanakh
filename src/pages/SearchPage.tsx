import SearchList from "@/components/SearchList";
import SearchForm from "@/components/SearchForm";
import { useSearchStore } from "@/store/use-search-store";
import { useEffect } from "react";

export default function SearchPage() {
  const { selectedIndex } = useSearchStore();

  useEffect(() => {
    if (selectedIndex !== null) {
      const listItems = document.querySelectorAll("ul li");
      const targetItem = listItems[selectedIndex];
      if (targetItem) {
        targetItem.scrollIntoView({
          behavior: "instant",
          block: "center",
        });
      }
    }
  }, [selectedIndex]);

  return (
    <section className="py-6 space-y-4">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <SearchForm />
      <SearchList />
    </section>
  );
}
