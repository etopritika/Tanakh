import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  User,
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
import { signInWithFacebook, signInWithGoogle } from "@/lib/auth-providers";
import { app } from "@/lib/firebase";
import { useUserStore } from "@/store/use-user-store";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (!user) return;
    const checkVerification = async () => {
      await user.reload();
      if (user.emailVerified) {
        localStorage.setItem("token", await user.getIdToken());
        localStorage.setItem("uid", user.uid);
        navigate("/", { replace: true });
      }
    };
    const interval = setInterval(checkVerification, 5000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const onSubmit = async (values: RegisterFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
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
          message: "Неизвестная ошибка, попробуйте позже.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      {emailSent ? (
        <p className="text-center text-green-600" role="alert">
          Пожалуйста, подтвердите ваш email. Проверьте почту и следуйте
          инструкциям.
        </p>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          aria-busy={isLoading}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Введите ваше имя"
                    className="bg-white"
                    autoComplete="name"
                    aria-invalid={!!form.formState.errors.name}
                    aria-describedby="name-error"
                  />
                </FormControl>
                <FormMessage
                  id="name-error"
                  className="text-danger"
                  role="alert"
                />
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
                  <Input
                    type="password"
                    {...field}
                    placeholder="Введите ваш пароль"
                    className="bg-white"
                    autoComplete="new-password"
                    aria-invalid={!!form.formState.errors.password}
                    aria-describedby="password-error"
                  />
                </FormControl>
                <FormMessage
                  id="password-error"
                  className="text-danger"
                  role="alert"
                />
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
                    {...field}
                    placeholder="Повторите ваш пароль"
                    className="bg-white"
                    autoComplete="new-password"
                    aria-invalid={!!form.formState.errors.confirmPassword}
                    aria-describedby="confirm-password-error"
                  />
                </FormControl>
                <FormMessage
                  id="confirm-password-error"
                  className="text-danger"
                  role="alert"
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-brown-dark text-white"
            disabled={isLoading}
            aria-label="Зарегистрироваться"
          >
            Зарегистрироваться{" "}
            {isLoading && (
              <LoaderCircle className="h-5 w-5 animate-spin text-white" />
            )}
          </Button>
          <Button
            type="button"
            onClick={(event) =>
              signInWithGoogle(event, form.setError, navigate)
            }
            variant="outline"
            className="mt-2 h-auto w-full whitespace-normal bg-white"
            aria-label="Зарегистрироваться через Google"
          >
            Зарегистрироваться через Google <GoogleIcon />
          </Button>
          <Button
            type="button"
            onClick={(event) =>
              signInWithFacebook(event, form.setError, navigate)
            }
            variant="outline"
            className="mt-2 h-auto w-full whitespace-normal bg-white"
            aria-label="Зарегистрироваться через Facebook"
          >
            Зарегистрироваться через Facebook <FacebookIcon />
          </Button>
        </form>
      )}
    </Form>
  );
}
