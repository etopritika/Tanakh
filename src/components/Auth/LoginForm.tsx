import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

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
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      console.log("Успешный вход:", userCredential.user);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Ошибка входа:", error.message);
      form.setError("email", { message: error.message });
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
      console.log("Google Авторизация успешна:", result.user);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Ошибка авторизации через Google:", error.message);
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
          onClick={signInWithGoogle}
          variant="outline"
          className="mt-2 w-full bg-white"
        >
          Войти через Google <GoogleIcon />
        </Button>
      </form>
    </Form>
  );
}
