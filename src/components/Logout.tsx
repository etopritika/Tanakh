import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { app } from "@/firebase";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Вийти
    </Button>
  );
}
