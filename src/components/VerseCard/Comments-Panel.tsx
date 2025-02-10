import { CirclePlus, MessageSquareOff, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import AddComment from "../Modals/Add-Comment";
import EditComment from "../Modals/Edit-Comment";
import ModalContainer from "../Modals/Modal-Container";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Input } from "@/components/ui/input";
import { Verse } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";

export default function CommentsPanel({
  defaultVerse,
}: {
  defaultVerse: Verse;
}) {
  const { setOpen } = useModal();
  const [comments, setComments] = useState<string[]>([]);
  const [filteredComments, setFilteredComments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const initialComments = defaultVerse.comment ? [defaultVerse.comment] : [];
    setComments(initialComments);
    setFilteredComments(initialComments);
  }, [defaultVerse.comment]);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    setFilteredComments(
      comments.filter((comment) => comment.toLowerCase().includes(lowerQuery)),
    );
  }, [searchQuery, comments]);

  const handleAddComment = () => {
    setOpen(
      <ModalContainer>
        <AddComment />
      </ModalContainer>,
    );
  };

  const handleEditComment = () => {
    setOpen(
      <ModalContainer>
        <EditComment />
      </ModalContainer>,
    );
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Поиск комментариев..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-52 bg-white"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleAddComment}
                className="bg-white p-2"
                variant="outline"
              >
                <CirclePlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>Добавить кометарий</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ul className="mt-4 italic">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment, index) => (
            <li key={index} className="prose mb-2 flex space-x-2">
              <div dangerouslySetInnerHTML={{ __html: comment }} />{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white p-2"
                      onClick={handleEditComment}
                    >
                      <Pencil size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                    <p>Изменить кометарий</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
