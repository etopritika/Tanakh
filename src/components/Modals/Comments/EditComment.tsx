import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import DeleteConfirmation from "./DeleteConfirmation";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import ModalContainer from "../ModalContainer";

import { toast } from "@/hooks/use-toast";
import { updateCommentInFirestore } from "@/lib/api/fetchFirestoreData";
import { FirestoreComment } from "@/lib/types";
import { useModal } from "@/providers/Modal/modal-context";

const commentSchema = z.object({
  text: z.string().min(1, "Комментарий не может быть пустым"),
  redirectLink: z.union([
    z.string().url("Введите корректную ссылку"),
    z.literal(""),
  ]),
});

type EditCommentProps = {
  comment: FirestoreComment;
  bookName: string;
};

export default function EditComment({ comment, bookName }: EditCommentProps) {
  const { setOpen, setClose } = useModal();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: comment.text || "",
      redirectLink: comment.redirectLink || "",
    },
  });

  const handleConfirmDeletion = () => {
    setOpen(
      <ModalContainer>
        <DeleteConfirmation comment={comment} bookName={bookName} />
      </ModalContainer>,
    );
  };

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      await updateCommentInFirestore(
        bookName,
        comment,
        data.text,
        data.redirectLink,
      );
      setClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка при редактировании комментария",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        aria-describedby="modal-description"
        aria-busy={form.formState.isSubmitting}
      >
        <h2 id="modal-title" className="text-lg font-bold">
          Изменить комментарий
        </h2>

        <p id="modal-description" className="sr-only">
          Измените текст комментария и, при необходимости, добавьте ссылку.
          Нажмите «Изменить», чтобы сохранить.
        </p>

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Введите свой комментарий здесь."
                  className="bg-white"
                  rows={5}
                  {...field}
                  aria-describedby="comment-error"
                />
              </FormControl>
              <FormMessage role="alert" id="comment-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="redirectLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка (необязательно)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Введите ссылку"
                  className="bg-white"
                  {...field}
                  aria-describedby="link-error"
                />
              </FormControl>
              <FormMessage role="alert" id="link-error" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Button
            className="bg-danger text-white"
            variant="outline"
            onClick={handleConfirmDeletion}
            aria-label="Удалить комментарий"
          >
            Удалить
          </Button>
          <Button
            type="submit"
            className="bg-brown-dark text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  aria-hidden="true"
                  focusable="false"
                />
                Изменение...
              </>
            ) : (
              "Изменить"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
