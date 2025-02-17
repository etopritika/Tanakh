import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { app, db } from "@/lib/firebase";
import { Comment } from "@/lib/types";

export const fetchComments = async (bookName: string, verseId: string) => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser?.uid;
  if (!currentUser) throw new Error("Пользователь не авторизован.");

  const commentsRef = collection(
    db,
    "books",
    bookName,
    "verses",
    verseId,
    "comments",
  );
  try {
    const q = query(
      commentsRef,
      where("uid", "==", currentUser),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const loadedComments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Comment;
      loadedComments.push({
        id: doc.id,
        uid: data.uid,
        text: data.text,
        createdAt: data.createdAt,
      });
    });

    return loadedComments;
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    throw new Error("Не удалось загрузить комментарии. Попробуйте позже.");
  }
};

export const addComment = async (
  bookName: string,
  verseId: string,
  comment: string,
): Promise<Comment> => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser?.uid;

  if (!currentUser) throw new Error("Пользователь не авторизован");

  try {
    const commentsRef = collection(
      db,
      "books",
      bookName,
      "verses",
      verseId,
      "comments",
    );

    const docRef: DocumentReference = await addDoc(commentsRef, {
      uid: currentUser,
      text: comment,
      createdAt: new Date(),
    });

    return {
      id: docRef.id,
      uid: currentUser,
      text: comment,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
    throw new Error("Не удалось добавить комментарий. Попробуйте позже.");
  }
};

export const editComment = async (
  bookName: string,
  verseId: string,
  commentId: string,
  newText: string,
): Promise<Comment> => {
  const auth = getAuth();
  const currentUser = auth.currentUser?.uid;

  if (!currentUser) throw new Error("Пользователь не авторизован.");

  const updatedComment: Comment = {
    id: commentId,
    uid: currentUser,
    text: newText,
    createdAt: new Date(),
  };

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

    await setDoc(commentRef, updatedComment, { merge: true });

    return updatedComment;
  } catch (error) {
    console.error("Ошибка при редактировании комментария:", error);
    throw new Error("Не удалось изменить комментарий. Попробуйте позже.");
  }
};

export const deleteComment = async (
  bookName: string,
  verseId: string,
  commentId: string,
): Promise<void> => {
  const auth = getAuth();
  const currentUser = auth.currentUser?.uid;

  if (!currentUser) throw new Error("Пользователь не авторизован.");

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
