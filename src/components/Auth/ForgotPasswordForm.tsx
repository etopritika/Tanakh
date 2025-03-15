import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { getFirebaseErrorMessage } from "./firebaseError";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendResetPasswordEmail } from "@/lib/auth-providers";

const forgotPasswordSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [isPending, setIsPending] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsPending(true);
    try {
      await sendResetPasswordEmail(values.email);
      setMessage({
        text: "Инструкции по восстановлению пароля отправлены на ваш email.",
        type: "success",
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setMessage({
          text: getFirebaseErrorMessage(error.code),
          type: "error",
        });
      } else {
        setMessage({
          text: "Произошла ошибка. Попробуйте позже.",
          type: "error",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle>Восстановление пароля</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between space-x-6">
              <Button
                onClick={() => navigate("/auth")}
                className="bg-white px-0"
              >
                <ArrowLeft />
                Назад
              </Button>
              <Button
                type="submit"
                className="h-auto whitespace-normal bg-brown-light text-white"
                disabled={isPending}
              >
                Отправить инструкции{" "}
                {isPending && (
                  <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                )}
              </Button>
            </div>
          </form>
        </Form>
        {message && (
          <p
            className={`mt-4 text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
