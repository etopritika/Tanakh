import { create } from "zustand";

import { Verse } from "@/lib/types";

type HomepageVersesState = {
  verses: Verse[];
  setVerses: (verses: Verse[]) => void;
  removeVerseById: (documentId: string) => void;
  clearGroup: (groupVerses: Verse[]) => void;
};

export const useHomepageVersesStore = create<HomepageVersesState>((set) => ({
  verses: [],
  setVerses: (verses) => set({ verses }),

  removeVerseById: (documentId) =>
    set((state) => ({
      verses: state.verses.filter((v) => v.documentId !== documentId),
    })),

  clearGroup: (groupVerses) =>
    set((state) => {
      const idsToRemove = new Set(groupVerses.map((verse) => verse.documentId));
      return {
        verses: state.verses.filter(
          (verse) => !idsToRemove.has(verse.documentId),
        ),
      };
    }),
}));
