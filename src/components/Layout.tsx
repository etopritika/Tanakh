import DesktopSidebar from "./Sidebar/DesktopSidebar";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-40px)] md:h-screen p-2">
        <DesktopSidebar />
        <main className="container mx-auto px-4 h-full">{children}</main>
      </div>
    </>
  );
}
