import { create } from "zustand";

import { VersesMetadata, FirestoreComment } from "@/lib/types";

interface FirestoreStore {
  verses: Record<string, VersesMetadata>;
  comments: Record<string, Record<string, FirestoreComment>>;

  setVerses: (verses: VersesMetadata[]) => void;
  addVerse: (verse: VersesMetadata) => void;
  updateVerseColor: (verseId: string, color: string) => void;

  setComments: (comments: FirestoreComment[]) => void;
  addComment: (comment: FirestoreComment) => void;
  updateComment: (
    commentId: string,
    newText: string,
    redirectLink: string,
  ) => void;
  deleteComment: (commentId: string) => void;
}

export const useFirestoreStore = create<FirestoreStore>((set) => ({
  verses: {},
  comments: {},

  setVerses: (verses) =>
    set(() => ({
      verses: Object.fromEntries(verses.map((v) => [v.verseId, v])),
    })),

  addVerse: (verse) =>
    set((state) => ({
      verses: { ...state.verses, [verse.verseId]: verse },
    })),

  updateVerseColor: (verseId, color) =>
    set((state) => ({
      verses: {
        ...state.verses,
        [verseId]: {
          ...state.verses[verseId],
          highlightColor: color,
        },
      },
    })),

  setComments: (comments) =>
    set(() => {
      const groupedComments: Record<
        string,
        Record<string, FirestoreComment>
      > = {};
      comments.forEach((comment) => {
        if (!groupedComments[comment.verseId]) {
          groupedComments[comment.verseId] = {};
        }
        groupedComments[comment.verseId][comment.id] = comment;
      });

      return { comments: groupedComments };
    }),

  addComment: (comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [comment.verseId]: {
          [comment.id]: comment,
          ...(state.comments[comment.verseId] || {}),
        },
      },
    })),

  updateComment: (commentId, newText, redirectLink) =>
    set((state) => {
      const updatedComments = { ...state.comments };
      for (const verseId in updatedComments) {
        if (updatedComments[verseId]?.[commentId]) {
          updatedComments[verseId][commentId] = {
            ...updatedComments[verseId][commentId],
            text: newText,
            redirectLink: redirectLink.trim(),
          };
          break;
        }
      }
      return { comments: updatedComments };
    }),

  deleteComment: (commentId) =>
    set((state) => {
      const updatedComments = { ...state.comments };
      for (const verseId in updatedComments) {
        if (updatedComments[verseId]?.[commentId]) {
          delete updatedComments[verseId][commentId];
          break;
        }
      }
      return { comments: updatedComments };
    }),
}));
