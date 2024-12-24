import SearchList from "@/components/SearchList";
import SearchForm from "@/components/SearchForm";

export default function SearchPage() {
  return (
    <section className="py-6 space-y-4">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <SearchForm />

      <SearchList />
    </section>
  );
}
