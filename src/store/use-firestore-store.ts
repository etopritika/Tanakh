import { create } from "zustand";

import { VersesMetadata, Comment } from "@/lib/types";

interface FirestoreStore {
  verses: VersesMetadata[];
  setVerses: (verses: VersesMetadata[]) => void;
  updateVerse: (verseId: string, updatedData: Partial<VersesMetadata>) => void;
  addComment: (verseId: string, comment: Comment) => void;
  updateComment: (verseId: string, commentId: string, newText: string) => void;
  deleteComment: (verseId: string, commentId: string) => void;
}

export const useFirestoreStore = create<FirestoreStore>((set) => ({
  verses: [],

  setVerses: (verses) => set({ verses }),

  updateVerse: (verseId, updatedData) =>
    set((state) => ({
      verses: state.verses.map((verse) =>
        verse.id === verseId ? { ...verse, ...updatedData } : verse,
      ),
    })),

  addComment: (verseId, comment) =>
    set((state) => ({
      verses: state.verses.map((verse) =>
        verse.id === verseId
          ? { ...verse, comments: [comment, ...verse.comments] }
          : verse,
      ),
    })),

  updateComment: (verseId, commentId, newText) =>
    set((state) => ({
      verses: state.verses.map((verse) =>
        verse.id === verseId
          ? {
              ...verse,
              comments: verse.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, text: newText }
                  : comment,
              ),
            }
          : verse,
      ),
    })),

  deleteComment: (verseId, commentId) =>
    set((state) => ({
      verses: state.verses.map((verse) =>
        verse.id === verseId
          ? {
              ...verse,
              comments: verse.comments.filter(
                (comment) => comment.id !== commentId,
              ),
            }
          : verse,
      ),
    })),
}));
