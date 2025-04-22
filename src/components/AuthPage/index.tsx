import { useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "@/components/ui/button";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle id="auth-form-title" as="h1">
          {isLogin ? "Авторизация" : "Регистрация"}
        </CardTitle>
      </CardHeader>

      <p id="auth-form-description" className="sr-only">
        {isLogin
          ? "Введите email и пароль для входа в аккаунт."
          : "Заполните данные для регистрации нового аккаунта."}
      </p>

      <CardContent
        aria-labelledby="auth-form-title"
        aria-describedby="auth-form-description"
      >
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </CardContent>

      <CardFooter className="justify-center">
        <div
          aria-live="polite"
          className="flex items-center justify-center gap-2"
        >
          <p>{isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}</p>
          <Button
            variant="link"
            className="px-0 text-blue-600 underline"
            onClick={() => setIsLogin(!isLogin)}
            aria-label={
              isLogin
                ? "Переключиться на регистрацию"
                : "Переключиться на авторизацию"
            }
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
