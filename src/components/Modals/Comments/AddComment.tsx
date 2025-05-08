import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { addCommentToFirestore } from "@/lib/api/fetchFirestoreData";
import { useModal } from "@/providers/Modal/modal-context";

const commentSchema = z.object({
  text: z.string().min(1, "Комментарий не может быть пустым"),
  redirectLink: z.union([
    z.string().url("Введите корректную ссылку"),
    z.literal(""),
  ]),
});

export default function AddComment({
  bookName,
  verseId,
}: {
  bookName: string;
  verseId: string;
}) {
  const { setClose } = useModal();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
      redirectLink: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      await addCommentToFirestore(
        bookName,
        verseId,
        data.text,
        data.redirectLink,
      );
      form.reset();
      setClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка при добавлении комментария",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-describedby="modal-description"
        aria-busy={form.formState.isSubmitting}
      >
        <h2 id="modal-title" className="text-lg font-bold">
          Добавить комментарий
        </h2>
        <p id="modal-description" className="sr-only">
          Заполните поле комментария и при необходимости добавьте ссылку.
          Нажмите «Добавить», чтобы сохранить.
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
            type="button"
            className="bg-white"
            variant="outline"
            onClick={() => setClose()}
          >
            Отмена
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
                Добавление...
              </>
            ) : (
              "Добавить"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
