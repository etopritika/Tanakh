import { useUserStore } from "@/store/use-user-store";

export default function UserName() {
  const { name } = useUserStore();
  return <p>{name ? name : "Пользователь"}</p>;
}
