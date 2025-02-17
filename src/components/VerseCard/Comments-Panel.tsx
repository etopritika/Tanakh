import { MessageSquareOff } from "lucide-react";
import { useState } from "react";

import AddCommentButton from "./Add-Comment-Button";
import EditCommentButton from "./Edit-Comment-Button";
import AddModal from "../Modals/Comments/Add-Modal";
import EditModal from "../Modals/Comments/Edit-Modal";
import ModalContainer from "../Modals/Modal-Container";

import { Input } from "@/components/ui/input";
import { BookPathMap, Verse, Comment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useFirestoreStore } from "@/store/use-firestore-store";

export default function CommentsPanel({
  defaultVerse,
}: {
  defaultVerse: Verse;
}) {
  const { setOpen } = useModal();
  const { verses } = useFirestoreStore();
  const [searchQuery, setSearchQuery] = useState("");

  const bookName = BookPathMap[defaultVerse.id_book].bookName;
  const verseId = `verse-${defaultVerse.id_chapter}-${defaultVerse?.id_chapter_two || 1}-${defaultVerse.poemNumber}`;

  const comments = verses.find((v) => v.id === verseId)?.comments || [];

  const handleOpenModal = (type: "add" | "edit", comment?: Comment) => {
    setOpen(
      <ModalContainer>
        {type === "add" ? (
          <AddModal bookName={bookName} verseId={verseId} />
        ) : (
          comment && (
            <EditModal
              comment={comment}
              bookName={bookName}
              verseId={verseId}
            />
          )
        )}
      </ModalContainer>,
    );
  };

  const filteredComments = [
    ...comments.filter(({ text }) =>
      text.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    ...(defaultVerse.comment
      ? [
          {
            id: "default",
            text: defaultVerse.comment,
            uid: "system",
            createdAt: new Date(),
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Поиск комментариев..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-52 bg-white"
        />
        <AddCommentButton onAdd={() => handleOpenModal("add")} />
      </div>

      <ul className="mt-4 italic">
        {filteredComments.length ? (
          filteredComments.map((comment) => (
            <li
              key={comment.id}
              className="prose mb-2 flex items-center justify-between space-x-2"
            >
              <div dangerouslySetInnerHTML={{ __html: comment.text }} />
              {comment.id !== "default" && (
                <EditCommentButton
                  onEdit={() => handleOpenModal("edit", comment)}
                />
              )}
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <MessageSquareOff size={20} />
            <span className="ml-2">Комментарии отсутствуют.</span>
          </div>
        )}
      </ul>
    </>
  );
}
