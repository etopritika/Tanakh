import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
import { app } from "@/firebase";
import { signInWithFacebook, signInWithGoogle } from "@/lib/authProviders";

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

  const onSubmit = async (values: LoginFormValues) => {
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

      navigate("/", { replace: true });
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
    }
  };

  return (
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
              <FormMessage className="text-danger" />
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
                <Input
                  type="password"
                  placeholder="Введите ваш пароль"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="text-danger" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-brown-light text-white">
          Войти
        </Button>
        <Button
          onClick={(event) => signInWithGoogle(event, form.setError, navigate)}
          variant="outline"
          className="mt-2 w-full bg-white"
        >
          Войти через Google <GoogleIcon />
        </Button>
        <Button
          onClick={(event) =>
            signInWithFacebook(event, form.setError, navigate)
          }
          variant="outline"
          className="mt-2 w-full bg-white"
        >
          Войти через Facebook <FacebookIcon />
        </Button>
      </form>
    </Form>
  );
}
