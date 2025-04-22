import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { getFirebaseErrorMessage } from "./firebaseError";
import { FacebookIcon, GoogleIcon } from "./icons";
import { loginSchema } from "./schema";

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
import { checkIfAdmin } from "@/lib/api/checkIfAdmin";
import { signInWithFacebook, signInWithGoogle } from "@/lib/auth-providers";
import { app } from "@/lib/firebase";
import { useUserStore } from "@/store/use-user-store";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setUserName } = useUserStore();

  const onSubmit = async (values: LoginFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      if (!userCredential.user.emailVerified) {
        throw new FirebaseError("auth/unverified-email", "");
      }

      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("uid", userCredential.user.uid);

      setUserName(userCredential.user.displayName);
      navigate("/", { replace: true });
      checkIfAdmin();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        form.setError("email", {
          message: getFirebaseErrorMessage(error.code),
        });
      } else {
        form.setError("email", {
          message: "Неизвестная ошибка, попробуйте еще раз позже.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                  {...field}
                  placeholder="example@mail.com"
                  className="bg-white"
                  autoComplete="email"
                  aria-invalid={!!form.formState.errors.email}
                  aria-describedby="email-error"
                />
              </FormControl>
              <FormMessage
                id="email-error"
                className="text-danger"
                role="alert"
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="password"
                    placeholder="Введите ваш пароль"
                    {...field}
                    className="bg-white"
                    autoComplete="current-password"
                  />
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="p-0 text-sm underline"
                    aria-label="Перейти на страницу восстановления пароля"
                  >
                    Забыли пароль?
                  </Button>
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-brown-light text-white"
          disabled={isLoading}
          aria-label="Войти в аккаунт"
        >
          Войти{" "}
          {isLoading && (
            <LoaderCircle className="h-5 w-5 animate-spin text-white" />
          )}
        </Button>
        <Button
          type="button"
          onClick={(event) => signInWithGoogle(event, form.setError, navigate)}
          variant="outline"
          className="mt-2 w-full bg-white"
          aria-label="Войти через Google"
        >
          Войти через Google <GoogleIcon />
        </Button>
        <Button
          type="button"
          onClick={(event) =>
            signInWithFacebook(event, form.setError, navigate)
          }
          variant="outline"
          className="mt-2 w-full bg-white"
          aria-label="Войти через Facebook"
        >
          Войти через Facebook <FacebookIcon />
        </Button>
      </form>
    </Form>
  );
}
