import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
  updateProfile,
} from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { getFirebaseErrorMessage } from "./firebaseError";
import { FacebookIcon, GoogleIcon } from "./icons";
import { registerSchema } from "./schema";

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
import { signInWithFacebook, signInWithGoogle } from "@/lib/authProviders";
import { app } from "@/lib/firebase";
import { useUserStore } from "@/store/use-user-store";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { setUserName } = useUserStore();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const checkVerification = async () => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          localStorage.setItem("token", await user.getIdToken());
          navigate("/", { replace: true });
        }
      }
    };
    if (user) {
      const interval = setInterval(checkVerification, 5000);
      return () => clearInterval(interval);
    }
  }, [user, navigate]);

  const onSubmit = async (values: RegisterFormValues) => {
    setIsPending(true);
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      await updateProfile(userCredential.user, {
        displayName: values.name,
      });
      setUserName(values.name);

      await sendEmailVerification(userCredential.user);
      setUser(userCredential.user);
      setEmailSent(true);
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
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      {emailSent ? (
        <div className="text-center text-green-600">
          Пожалуйста, подтвердите ваш email. Проверьте почту и следуйте
          инструкциям.
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите ваше имя"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Повторите ваш пароль"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-brown-light text-white"
            disabled={isPending}
          >
            Зарегистрироваться{" "}
            {isPending && (
              <LoaderCircle className="h-5 w-5 animate-spin text-white" />
            )}
          </Button>
          <Button
            onClick={(event) =>
              signInWithGoogle(event, form.setError, navigate)
            }
            variant="outline"
            className="mt-2 h-auto w-full whitespace-normal bg-white"
          >
            Зарегистрироваться через Google
            <GoogleIcon />
          </Button>
          <Button
            onClick={(event) =>
              signInWithFacebook(event, form.setError, navigate)
            }
            variant="outline"
            className="mt-2 h-auto w-full whitespace-normal bg-white"
          >
            Зарегистрироваться через Facebook <FacebookIcon />
          </Button>
        </form>
      )}
    </Form>
  );
}
