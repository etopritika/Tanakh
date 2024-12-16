import ScrollUpButton from "./Scroll-up-button";
import Sidebar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen p-2">
      <Sidebar />
      <main className="container mx-auto px-4 h-full">{children}</main>
      <ScrollUpButton />
    </div>
  );
}
