import { useUserStore } from "@/store/use-user-store";

export default function UserName() {
  const { name } = useUserStore();
  return <p>Рады вас видеть {name ? name : "Пользователь"}.</p>;
}
