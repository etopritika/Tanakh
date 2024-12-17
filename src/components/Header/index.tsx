import MobileSidebar from "../Sidebar/MobileSidebar";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="container py-2 flex mx-auto px-4 border-b md:p-2 md:mx-0 md:justify-end">
      <MobileSidebar />
      <Input
        className="bg-white w-full max-w-80 ml-4 md:ml-0"
        placeholder="Поиск..."
      />
    </header>
  );
}
