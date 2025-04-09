// store/use-homepage-verses-store.ts
import { create } from "zustand";

import { Verse } from "@/lib/types";

type HomepageVersesState = {
  verses: Verse[];
  setVerses: (verses: Verse[]) => void;
  removeVerseById: (documentId: string) => void;
  clearVerses: () => void;
};

export const useHomepageVersesStore = create<HomepageVersesState>((set) => ({
  verses: [],
  setVerses: (verses) => set({ verses }),
  removeVerseById: (documentId) =>
    set((state) => ({
      verses: state.verses.filter((v) => v.documentId !== documentId),
    })),
  clearVerses: () => set({ verses: [] }),
}));
