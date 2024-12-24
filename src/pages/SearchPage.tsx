// import { useSearchStore } from "@/store/use-search-store";
import SearchList from "@/components/SearchList";
import SearchForm from "@/components/SearchForm";

export default function SearchPage() {
  // const { storeResults, error, isSearchComplete } = useSearchStore();

  return (
    <section className="py-6 space-y-4">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <SearchForm />

      {/* {error && <p className="text-danger">{error}</p>}
      {storeResults.length === 0 && isSearchComplete && (
        <div className="flex justify-center">
          <span>Нет результатов.</span>
        </div>
      )} */}
      <SearchList />
    </section>
  );
}
