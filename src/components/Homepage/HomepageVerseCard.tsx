import { X } from "lucide-react";

import ModalContainer from "../Modals/ModalContainer";
import DeleteHomepageConfirmation from "../Modals/VerseActions/DeleteHomepageConfirmation";
import { Card, CardContent } from "../ui/card";

import { Verse } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";
import { useUserStore } from "@/store/use-user-store";

export default function HomepageVerseCard({
  verse,
  setVerses,
}: {
  verse: Verse;
  setVerses: React.Dispatch<React.SetStateAction<Verse[]>>;
}) {
  const { setOpen } = useModal();
  const { role } = useUserStore();
  const isAdmin = role === "admin";

  const handleOpenDeleteModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(
      <ModalContainer>
        <DeleteHomepageConfirmation verse={verse} setVerses={setVerses} />
      </ModalContainer>,
    );
  };

  return (
    <li>
      <article>
        <Card className="relative bg-white">
          {isAdmin && (
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
              onClick={handleOpenDeleteModal}
            >
              <X />
            </button>
          )}
          <CardContent className="space-y-3 p-4">
            <p className="pr-8">
              <strong>{verse.poemNumber}</strong> {verse.verse}
            </p>
            {verse.verse_ivrit && (
              <p lang="he" dir="rtl" className="text-right">
                {verse.verse_ivrit}
              </p>
            )}
          </CardContent>
        </Card>
      </article>
    </li>
  );
}
