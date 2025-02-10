import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { useModal } from "@/providers/modal-provider";

export default function AddComment() {
  const { setClose } = useModal();
  return (
    <div className="space-y-6">
      <h2>Добавить коментарий</h2>
      <Textarea
        placeholder="Введите свой комментарий здесь."
        className="bg-white"
      />
      <div className="flex items-center justify-between">
        <Button className="bg-white" variant="outline" onClick={setClose}>
          Отмена
        </Button>
        <Button className="bg-brown-light text-white">Добавить</Button>
      </div>
    </div>
  );
}
