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
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Comment, FirestoreComment, VersesMetadata } from "@/lib/types";

export const fetchVersesMetadataByBook = async (
  bookName: string,
): Promise<VersesMetadata[]> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const versesRef = collection(db, "books", bookName, "verses");
    const q = query(versesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const verses: VersesMetadata[] = await Promise.all(
      querySnapshot.docs.map(async (verseDoc) => {
        const verseData = verseDoc.data();

        const commentsRef = collection(verseDoc.ref, "comments");
        const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"));
        const commentsSnap = await getDocs(commentsQuery);

        const comments = commentsSnap.docs.map((commentDoc) => {
          const commentData = commentDoc.data() as FirestoreComment;
          return {
            id: commentDoc.id,
            text: commentData.text,
            createdAt: commentData.createdAt.toDate(),
          };
        });

        return {
          id: verseData.verseId,
          highlightColor: verseData.highlightColor,
          comments,
        };
      }),
    );

    return verses;
  } catch (error) {
    console.error("Ошибка при получении данных о стихах:", error);
    throw new Error("Не удалось загрузить данные о стихах. Попробуйте позже.");
  }
};

export const addCommentToFirestore = async (
  bookName: string,
  verseId: string,
  text: string,
): Promise<Comment> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentsRef = collection(
      db,
      "books",
      bookName,
      "verses",
      verseId,
      "comments",
    );

    const newComment = {
      uid,
      text,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(commentsRef, newComment);

    return {
      id: docRef.id,
      ...newComment,
      createdAt: newComment.createdAt.toDate(),
    };
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
    throw new Error("Не удалось добавить комментарий. Попробуйте позже.");
  }
};

export const editCommentInFirestore = async (
  bookName: string,
  verseId: string,
  commentId: string,
  newText: string,
): Promise<void> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentRef = doc(
      db,
      "books",
      bookName,
      "verses",
      verseId,
      "comments",
      commentId,
    );
    await updateDoc(commentRef, { text: newText });
  } catch (error) {
    console.error("Ошибка при редактировании комментария:", error);
    throw new Error("Не удалось изменить комментарий. Попробуйте позже.");
  }
};

export const deleteCommentFromFirestore = async (
  bookName: string,
  verseId: string,
  commentId: string,
): Promise<void> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const commentRef = doc(
      db,
      "books",
      bookName,
      "verses",
      verseId,
      "comments",
      commentId,
    );
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("Ошибка при удалении комментария:", error);
    throw new Error("Не удалось удалить комментарий. Попробуйте позже.");
  }
};

export const updateVerseColorInFirestore = async (
  bookName: string,
  verseId: string,
  color: string,
): Promise<void> => {
  const uid = localStorage.getItem("uid");
  if (!uid) throw new Error("Пользователь не авторизован");

  try {
    const verseRef = doc(db, "books", bookName, "verses", verseId);

    await updateDoc(verseRef, { highlightColor: color });
  } catch (error) {
    console.error("Ошибка при обновлении цвета стиха:", error);
    throw new Error("Не удалось обновить цвет. Попробуйте позже.");
  }
};
