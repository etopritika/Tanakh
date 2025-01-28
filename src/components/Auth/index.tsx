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
        <CardTitle>{isLogin ? "Авторизация" : "Регистрация"}</CardTitle>
      </CardHeader>
      <CardContent>{isLogin ? <LoginForm /> : <RegisterForm />}</CardContent>
      <CardFooter className="justify-center">
        <p>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <Button
            variant="link"
            className="text-blue-600 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
