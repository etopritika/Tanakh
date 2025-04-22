import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "@/components/AuthPage";

export default function AuthPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <section
      aria-labelledby="auth-page-title"
      className="flex min-h-screen items-center justify-center py-6"
    >
      <h1 id="auth-page-title" className="sr-only">
        Вход в аккаунт
      </h1>

      <AuthForm />
    </section>
  );
}
