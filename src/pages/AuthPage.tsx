import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "@/components/Auth";

export default function AuthPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <section className="flex h-full items-center justify-center py-6">
      <AuthForm />
    </section>
  );
}
