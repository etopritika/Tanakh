import DeleteConfirmation from "./Delete-Confirmation";
import ModalContainer from "./modal-container";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { useModal } from "@/providers/modal-provider";

export default function EditComment() {
  const { setOpen } = useModal();

  const handleConfirmDeletion = () => {
    setOpen(
      <ModalContainer>
        <DeleteConfirmation />
      </ModalContainer>,
    );
  };
  return (
    <div className="space-y-6">
      <h2>Изменить коментарий</h2>
      <Textarea
        placeholder="Введите свой комментарий здесь."
        className="bg-white"
      />
      <div className="flex items-center justify-between">
        <Button
          className="bg-danger text-white"
          variant="outline"
          onClick={handleConfirmDeletion}
        >
          Удалить
        </Button>
        <Button className="bg-brown-light text-white">Изменить</Button>
      </div>
    </div>
  );
}
