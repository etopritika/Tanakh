import { create } from "zustand";

import { Verse } from "@/lib/types";

interface SearchStore {
  storeQuery: string;
  storeResults: Verse[];
  error: string | null;
  isSearchComplete: boolean;
  selectedIndex: number | null;
  setIsSearchComplete: (status: boolean) => void;
  setQuery: (query: string) => void;
  setResults: (results: Verse[]) => void;
  setError: (error: string | null) => void;
  setSelectedIndex: (index: number | null) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  storeQuery: "",
  storeResults: [],
  error: null,
  isSearchComplete: false,
  selectedIndex: null,
  setQuery: (storeQuery) => set({ storeQuery }),
  setResults: (storeResults) => set({ storeResults }),
  setError: (error) => set({ error }),
  setIsSearchComplete: (status) => set({ isSearchComplete: status }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  clearSearch: () =>
    set({
      storeQuery: "",
      storeResults: [],
      error: null,
      isSearchComplete: false,
      selectedIndex: null,
    }),
}));
