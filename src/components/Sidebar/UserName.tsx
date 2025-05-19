import { useUserStore } from "@/store/use-user-store";

export default function UserName() {
  const { name } = useUserStore();

  return (
    <p aria-label={`Имя пользователя: ${name || "Пользователь"}`}>
      {name || "Пользователь"}
    </p>
  );
}
