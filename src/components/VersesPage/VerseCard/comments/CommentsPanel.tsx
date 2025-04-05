import { useState } from "react";

import EditCommentButton from "./EditCommentButton";
import AddComment from "../../../Modals/Comments/AddComment";
import EditComment from "../../../Modals/Comments/EditComment";
import ModalContainer from "../../../Modals/ModalContainer";
import RedirectButton from "../actions/RedirectButton";

import { Input } from "@/components/ui/input";
import { BookPathMap, Verse, FirestoreComment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useFirestoreStore } from "@/store/use-firestore-store";

export default function CommentsPanel({
  defaultVerse,
}: {
  defaultVerse: Verse;
}) {
  const { setOpen } = useModal();
  const [searchQuery, setSearchQuery] = useState("");

  const bookName = BookPathMap[defaultVerse.id_book].bookName;
  const verseId = `verse-${defaultVerse.id_chapter}-${defaultVerse?.id_chapter_two || 1}-${defaultVerse.poemNumber}`;

  const verseComments = Object.values(
    useFirestoreStore((state) => state.comments[verseId]) ?? {},
  );

  const handleOpenModal = (
    type: "add" | "edit",
    comment?: FirestoreComment,
  ) => {
    setOpen(
      <ModalContainer>
        {type === "add" ? (
          <AddComment bookName={bookName} verseId={verseId} />
        ) : (
          comment && <EditComment comment={comment} bookName={bookName} />
        )}
      </ModalContainer>,
    );
  };

  const filteredComments = [
    ...verseComments.filter(({ text }) =>
      text.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    // ...(defaultVerse.comment
    //   ? [
    //       {
    //         id: "default",
    //         text: defaultVerse.comment,
    //         uid: "system",
    //         verseId: verseId,
    //         createdAt: new Date(),
    //         redirectLink: "",
    //       },
    //     ]
    //   : []),
  ];

  const lastIndex = filteredComments.length - 1;

  return (
    <>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Поиск комментариев..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-52 bg-white"
        />
      </div>

      <ul className="mt-4 italic">
        {filteredComments.map((comment, index) => {
          const lastComment = index === lastIndex;
          return (
            <li
              key={comment.id}
              className={`prose flex items-center justify-between space-x-2 text-text ${lastComment ? "border-none py-0 pt-2" : "border-b py-2"}`}
            >
              <div className="flex flex-col">
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                />
                {comment.redirectLink && (
                  <RedirectButton redirectLink={comment.redirectLink} />
                )}
              </div>

              {comment.id !== "default" && (
                <EditCommentButton
                  onEdit={() => handleOpenModal("edit", comment)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
