import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchFormData, searchSchema } from "@/lib/types";
import { useDebouncedSearch } from "@/hooks/use-debounce-search";
import { X } from "lucide-react";
import { useSearchStore } from "@/store/use-search-store";
import { useState } from "react";
import SearchList from "@/components/SearchList";

export default function SearchPage() {
  const { storeQuery, storeResults, error, clearSearch, setResults, setError } =
    useSearchStore();
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: storeQuery },
    mode: "onChange",
  });

  const debouncedSearch = useDebouncedSearch(setIsSearchComplete);

  const handleChange = (value: string) => {
    if (!value.trim()) {
      setResults([]);
      setError(null);
      setIsSearchComplete(false);
      return;
    }
    if (!form.formState.errors.query) {
      debouncedSearch({ query: value });
    }
  };

  const handleClear = () => {
    form.setValue("query", "");
    setIsSearchComplete(false);
    clearSearch();
  };

  return (
    <section className="py-6 space-y-4">
      <h1 className="text-xl font-bold">Поиск стихов</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <FormField
            name="query"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Введите запрос:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Поиск..."
                      className="bg-white pr-10"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange(e.target.value);
                      }}
                    />
                    {storeQuery && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Очистить поле ввода"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {error && <p className="text-danger">{error}</p>}
      {storeResults.length === 0 && isSearchComplete && (
        <div className="flex justify-center">
          <span>Нет результатов.</span>
        </div>
      )}
      <SearchList />
    </section>
  );
}
