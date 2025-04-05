import { create } from "zustand";

import { toast } from "@/hooks/use-toast";
import { Verse } from "@/lib/types";

type Mode = "copy" | "add" | null;

type SelectionState = {
  isSelecting: boolean;
  mode: Mode;
  bookName: string | null;
  chapterId: number | null;
  verses: Record<string, Verse>;

  startSelecting: (
    mode: Mode,
    bookName: string,
    chapterId: number,
    verseId: string,
    verse: Verse,
  ) => void;

  toggleVerseSelection: (verseId: string, verse: Verse) => void;
  cancelSelection: () => void;

  copyToClipboard: () => void;
};

export const useSelectionStore = create<SelectionState>((set, get) => ({
  isSelecting: false,
  mode: null,
  bookName: null,
  chapterId: null,
  verses: {},

  startSelecting: (mode, bookName, chapterId, verseId, verse) =>
    set({
      isSelecting: true,
      mode,
      bookName,
      chapterId,
      verses: { [verseId]: verse },
    }),

  toggleVerseSelection: (verseId, verse) =>
    set((state) => {
      const updatedVerses = { ...state.verses };

      if (updatedVerses[verseId]) {
        delete updatedVerses[verseId];
      } else {
        updatedVerses[verseId] = verse;
      }

      return { verses: updatedVerses };
    }),

  cancelSelection: () =>
    set({
      isSelecting: false,
      mode: null,
      bookName: null,
      chapterId: null,
      verses: {},
    }),

  copyToClipboard: async () => {
    const { bookName, chapterId, verses } = get();

    const text = Object.values(verses)
      .sort((a, b) => a.poemNumber - b.poemNumber)
      .map((v) => `${v.poemNumber}: ${v.verse}\n${v.verse_ivrit || ""}`)
      .join("\n");

    const finalText =
      bookName && chapterId ? `${bookName} ${chapterId}\n${text}` : text;

    try {
      await navigator.clipboard.writeText(finalText);
    } catch {
      toast({
        variant: "destructive",
        title: "Ошибка при копировании",
        description:
          "Не удалось скопировать стихи. Попробуйте снова или скопируйте вручную.",
      });
    }

    set({
      isSelecting: false,
      mode: null,
      bookName: null,
      chapterId: null,
      verses: {},
    });
  },
}));
