import { create } from "zustand";
import { Verse } from "@/lib/types";

interface SearchStore {
  storeQuery: string;
  storeResults: Verse[];
  error: string | null;
  isSearchComplete: boolean;
  setIsSearchComplete: (status: boolean) => void;
  setQuery: (query: string) => void;
  setResults: (results: Verse[]) => void;
  setError: (error: string | null) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  storeQuery: "",
  storeResults: [],
  error: null,
  isSearchComplete: false,
  setQuery: (storeQuery) => set({ storeQuery }),
  setResults: (storeResults) => set({ storeResults }),
  setError: (error) => set({ error }),
  setIsSearchComplete: (status) => set({ isSearchComplete: status }),
  clearSearch: () =>
    set({
      storeQuery: "",
      storeResults: [],
      error: null,
      isSearchComplete: false,
    }),
}));
