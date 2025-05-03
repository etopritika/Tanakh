import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);

      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("user-storage");

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
      size="sm"
    >
      Выйти
    </Button>
  );
}
