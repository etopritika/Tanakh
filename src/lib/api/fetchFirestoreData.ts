import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { VersesMetadata, FirestoreComment } from "@/lib/types";
import { useFirestoreStore } from "@/store/use-firestore-store";

/**
 * Fetch all verses by book for the authenticated user.
 * @param {string} bookName - The name of the book.
 * @returns {Promise<VersesMetadata[]>} - The list of verses.
 */
export const fetchVersesByBook = async (bookName: string) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const versesRef = collection(db, "books", bookName, "verses");
    const q = query(versesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const verses: VersesMetadata[] = querySnapshot.docs.map((verseDoc) => ({
      id: verseDoc.id,
      ...verseDoc.data(),
    })) as VersesMetadata[];

    useFirestoreStore.getState().setVerses(verses);
    return verses;
  } catch (error) {
    console.error("Ошибка при получении стихов:", error);
    throw new Error("Не удалось загрузить стихи. Попробуйте позже.");
  }
};

/**
 * Fetch all comments by book for the authenticated user.
 * @param {string} bookName - The name of the book.
 * @returns {Promise<FirestoreComment[]>} - The list of comments.
 */
export const fetchCommentsByBook = async (bookName: string) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentsRef = collection(db, "books", bookName, "comments");
    const q = query(commentsRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const comments: FirestoreComment[] = querySnapshot.docs.map(
      (commentDoc) => {
        const data = commentDoc.data();
        return {
          id: commentDoc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        };
      },
    ) as FirestoreComment[];

    useFirestoreStore.getState().setComments(comments);
    return comments;
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    throw new Error("Не удалось загрузить комментарии. Попробуйте позже.");
  }
};

/**
 * Create a new verse in Firestore.
 * @param {string} bookName - The book name.
 * @param {string} verseId - The verse identifier.
 * @param {string} uid - The user ID.
 * @returns {Promise<string>} - The ID of the newly created verse.
 */
export const createVerseInFirestore = async (
  bookName: string,
  verseId: string,
  uid: string,
) => {
  const newVerseRef = await addDoc(
    collection(db, "books", bookName, "verses"),
    {
      verseId,
      uid,
      highlightColor: "transparent",
    },
  );
  return newVerseRef.id;
};

/**
 * Add a new comment to Firestore.
 * @param {string} bookName - The book name.
 * @param {string} verseId - The verse identifier.
 * @param {string} text - The comment text.
 */
export const addCommentToFirestore = async (
  bookName: string,
  verseId: string,
  text: string,
) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentsRef = collection(db, "books", bookName, "comments");

    const newComment = {
      verseId,
      text,
      uid,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(commentsRef, newComment);

    useFirestoreStore.getState().addComment({
      id: docRef.id,
      ...newComment,
      createdAt: newComment.createdAt.toDate(),
    });
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
    throw new Error("Не удалось добавить комментарий. Попробуйте позже.");
  }
};

/**
 * Update a comment in Firestore.
 * @param {string} bookName - The book name.
 * @param {FirestoreComment} comment - The comment object.
 * @param {string} newText - The updated comment text.
 */
export const updateCommentInFirestore = async (
  bookName: string,
  comment: FirestoreComment,
  newText: string,
) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentRef = doc(db, "books", bookName, "comments", comment.id);
    await updateDoc(commentRef, { text: newText });

    useFirestoreStore.getState().updateComment(comment.id, newText);
  } catch (error) {
    console.error("Ошибка при обновлении комментария:", error);
    throw new Error("Не удалось обновить комментарий. Попробуйте позже.");
  }
};

/**
 * Delete a comment from Firestore.
 * @param {string} bookName - The book name.
 * @param {FirestoreComment} comment - The comment object.
 */
export const deleteCommentFromFirestore = async (
  bookName: string,
  comment: FirestoreComment,
) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentRef = doc(db, "books", bookName, "comments", comment.id);
    await deleteDoc(commentRef);

    useFirestoreStore.getState().deleteComment(comment.id);
  } catch (error) {
    console.error("Ошибка при удалении комментария:", error);
    throw new Error("Не удалось удалить комментарий. Попробуйте позже.");
  }
};

/**
 * Create a new verse with color in Firestore.
 * @param {string} bookName - The book name.
 * @param {string} verseId - The verse identifier.
 * @param {string} color - The highlight color.
 */
export const createVerseColorInFirestore = async (
  bookName: string,
  verseId: string,
  color: string,
): Promise<void> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const docRef = await addDoc(collection(db, "books", bookName, "verses"), {
      verseId,
      uid,
      highlightColor: color,
    });

    useFirestoreStore.getState().addVerse({
      id: docRef.id,
      verseId,
      uid,
      highlightColor: color,
    });
  } catch (error) {
    console.error("Ошибка при создании стиха:", error);
    throw new Error("Не удалось создать стих. Попробуйте позже.");
  }
};

/**
 * Update the highlight color of a verse in Firestore.
 * @param {string} bookName - The book name.
 * @param {string} docId - The document ID.
 * @param {string} verseId - The verse identifier.
 * @param {string} color - The new highlight color.
 */
export const updateVerseColorInFirestore = async (
  bookName: string,
  docId: string,
  verseId: string,
  color: string,
): Promise<void> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const verseRef = doc(db, "books", bookName, "verses", docId);
    await updateDoc(verseRef, { highlightColor: color });

    useFirestoreStore.getState().updateVerseColor(verseId, color);
  } catch (error) {
    console.error("Ошибка при обновлении цвета стиха:", error);
    throw new Error("Не удалось обновить цвет. Попробуйте позже.");
  }
};
