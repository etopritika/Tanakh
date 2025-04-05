import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { VersesMetadata, FirestoreComment, Verse } from "@/lib/types";
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
  } catch {
    throw new Error(
      "Не удалось загрузить информацию о стихах. Попробуйте позже.",
    );
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
    const q = query(
      commentsRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
    );
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
    useFirestoreStore.getState().setCommentsLoaded(true);
    return comments;
  } catch {
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
  redirectLink: string,
) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentsRef = collection(db, "books", bookName, "comments");

    const newComment = {
      verseId,
      text,
      uid,
      createdAt: new Date(),
      redirectLink: redirectLink.trim(),
    };

    const docRef = await addDoc(commentsRef, {
      ...newComment,
      createdAt: Timestamp.now(),
    });

    useFirestoreStore.getState().addComment({
      id: docRef.id,
      ...newComment,
    });
  } catch {
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
  redirectLink: string,
) => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentRef = doc(db, "books", bookName, "comments", comment.id);
    await updateDoc(commentRef, {
      text: newText,
      redirectLink: redirectLink.trim(),
    });

    useFirestoreStore
      .getState()
      .updateComment(comment.id, newText, redirectLink.trim());
  } catch {
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
  } catch {
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
  } catch {
    throw new Error("Не удалось создать запись стиха. Попробуйте позже.");
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
  } catch {
    throw new Error("Не удалось обновить цвет. Попробуйте позже.");
  }
};

export const addVerseToHomepage = async (verses: Record<string, Verse>) => {
  const batch = writeBatch(db);

  for (const [docId, verse] of Object.entries(verses)) {
    const docRef = doc(db, "homepage_verses", docId);
    batch.set(docRef, verse);
  }

  try {
    await batch.commit();
    console.log("Успішно збережено всі вірші.");
  } catch (error) {
    console.error("Помилка при збереженні віршів:", error);
    throw error;
  }
};

/**
 * Fetches all verses that should be displayed on the homepage, sorted by poemNumber.
 * @returns {Promise<(Verse & { documentId: string })[]>} - Array of verses with document IDs.
 */
export const fetchHomepageVerses = async (): Promise<
  (Verse & { documentId: string })[]
> => {
  try {
    const versesRef = collection(db, "homepage_verses");
    const q = query(versesRef, orderBy("poemNumber", "asc"));
    const snapshot = await getDocs(q);

    const verses = snapshot.docs.map((doc) => ({
      ...doc.data(),
      documentId: doc.id,
    })) as (Verse & { documentId: string })[];

    return verses;
  } catch {
    throw new Error("Не удалось загрузить стихи для главной страницы.");
  }
};

/**
 * Deletes a verse from the "homepage_verses" collection in Firestore.
 * This function is used to remove a verse from the homepage.
 *
 * @param {string} verseId - The ID of the verse to delete (document ID in Firestore).
 * @returns {Promise<void>} - Resolves when the verse is successfully deleted.
 * @throws {Error} - Throws an error if the deletion fails.
 */
export const deleteVerseFromHomepage = async (
  verseId: string,
): Promise<void> => {
  try {
    const verseRef = doc(db, "homepage_verses", verseId);
    await deleteDoc(verseRef);
  } catch {
    throw new Error("Не удалось удалить стих. Попробуйте позже.");
  }
};
