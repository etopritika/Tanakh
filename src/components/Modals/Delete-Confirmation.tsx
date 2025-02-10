import { Button } from "../ui/button";

import { useModal } from "@/providers/Modal/modal-context";

export default function DeleteConfirmation() {
  const { setClose } = useModal();
  return (
    <div className="space-y-6">
      <h2>Вы действительно хотите удалить коментарий?</h2>
      <div className="flex items-center justify-between">
        <Button variant="outline" className="bg-white" onClick={setClose}>
          Отмена
        </Button>
        <Button className="bg-danger text-white">Удалить</Button>
      </div>
    </div>
  );
}
