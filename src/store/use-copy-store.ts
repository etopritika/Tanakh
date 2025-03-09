import { create } from "zustand";

import { toast } from "@/hooks/use-toast";

type CopyState = {
  isSelecting: boolean;
  bookName: string | null;
  chapterId: number | null;
  verses: Record<
    string,
    { verseContent: string; poemNumber: number; verseIvrit: string }
  >;
  startCopying: (
    bookName: string,
    chapterId: number,
    verseId: string,
    verseContent: string,
    poemNumber: number,
    verseIvrit: string,
  ) => void;
  toggleVerseSelection: (
    verseId: string,
    verseContent: string,
    poemNumber: number,
    verseIvrit: string,
  ) => void;
  cancelSelection: () => void;
  copyToClipboard: () => void;
};

export const useCopyStore = create<CopyState>((set, get) => ({
  isSelecting: false,
  bookName: null,
  chapterId: null,
  verses: {},

  startCopying: (
    bookName,
    chapterId,
    verseId,
    verseContent,
    poemNumber,
    verseIvrit,
  ) =>
    set({
      isSelecting: true,
      bookName,
      chapterId,
      verses: { [verseId]: { verseContent, poemNumber, verseIvrit } },
    }),

  toggleVerseSelection: (verseId, verseContent, poemNumber, verseIvrit) =>
    set((state) => {
      const updatedVerses = { ...state.verses };

      if (updatedVerses[verseId]) {
        delete updatedVerses[verseId];
      } else {
        updatedVerses[verseId] = { verseContent, poemNumber, verseIvrit };
      }

      return { verses: updatedVerses };
    }),

  cancelSelection: () =>
    set({ isSelecting: false, bookName: null, chapterId: null, verses: {} }),

  copyToClipboard: async () => {
    const { bookName, chapterId, verses } = get();
    const text = Object.values(verses)
      .sort((a, b) => a.poemNumber - b.poemNumber)
      .map((v) => `${v.poemNumber}: ${v.verseContent}\n${v.verseIvrit}`)
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
    set({ isSelecting: false, bookName: null, chapterId: null, verses: {} });
  },
}));
