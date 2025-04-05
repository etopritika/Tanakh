import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDebouncedSearch } from "@/hooks/use-debounce-search";
import { SearchFormData, searchSchema } from "@/lib/types";
import { useSearchStore } from "@/store/use-search-store";

export default function SearchForm() {
  const { storeQuery, clearSearch } = useSearchStore();

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: storeQuery },
    mode: "onChange",
  });
  const debouncedSearch = useDebouncedSearch();

  const handleChange = (value: string) => {
    if (!value.trim()) {
      clearSearch();
      return;
    }
    if (!form.formState.errors.query) {
      debouncedSearch({ query: value });
    }
  };

  const handleClear = () => {
    form.setValue("query", "");
    clearSearch();
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField
          name="query"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Введите запрос:</FormLabel>
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
  );
}
