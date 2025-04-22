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

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle id="forgot-password-form-title" as="h1">
          Восстановление пароля
        </CardTitle>
      </CardHeader>
      <CardContent aria-labelledby="forgot-password-form-title">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            aria-busy={isLoading}
          >
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
                      aria-invalid={!!form.formState.errors.email}
                      aria-describedby="email-error"
                    />
                  </FormControl>
                  <FormMessage id="email-error" role="alert" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between space-x-6">
              <Button
                onClick={() => navigate("/auth")}
                className="bg-white px-0"
                type="button"
                aria-label="Вернуться на страницу авторизации"
              >
                <ArrowLeft aria-hidden="true" focusable="false" />
                Назад
              </Button>
              <Button
                type="submit"
                className="h-auto whitespace-normal bg-brown-light text-white"
                disabled={isLoading}
              >
                Отправить инструкции{" "}
                {isLoading && (
                  <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                )}
              </Button>
            </div>
          </form>
        </Form>
        {message && (
          <p
            key={message.text}
            className={`mt-4 text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
            role="alert"
          >
            {message.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
