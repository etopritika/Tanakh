import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { getFirebaseErrorMessage } from "./firebaseError";
import { GoogleIcon } from "./icons";

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

const registerSchema = z
  .object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
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
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      await sendEmailVerification(userCredential.user);
      setUser(userCredential.user);
      setEmailSent(true);
      console.log("Лист для подтверждения email отправлен.");
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

  const signInWithGoogle = async (event: React.MouseEvent) => {
    event.preventDefault();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
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
      {emailSent ? (
        <div className="text-center text-green-600">
          Пожалуйста, подтвердите ваш email. Проверьте почту и следуйте
          инструкциям.
        </div>
      ) : (
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
          <Button type="submit" className="w-full bg-brown-light text-white">
            Зарегистрироваться
          </Button>
          <Button
            onClick={signInWithGoogle}
            variant="outline"
            className="mt-2 w-full bg-white"
          >
            Зарегистрироваться через Google
            <GoogleIcon />
          </Button>
        </form>
      )}
    </Form>
  );
}
