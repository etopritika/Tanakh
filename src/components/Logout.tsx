import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { app } from "@/firebase";
import { toast } from "@/hooks/use-toast";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/auth", { replace: true });
    } catch {
      toast({
        title: "Ошибка выхода",
        description: "Не удалось завершить сеанс. Попробуйте ещё раз.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="bg-brown-light text-white"
    >
      Вийти
    </Button>
  );
}
