import MobileSidebar from "../Sidebar/MobileSidebar";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="container mx-auto md:mx-0 md:max-w-none border-b flex justify-between md:justify-end p-1">
      <MobileSidebar />
      <Input className="bg-white w-full max-w-80" placeholder="Поиск..." />
    </header>
  );
}
