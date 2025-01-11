import Header from "./Header";
import ScrollUpButton from "./Scroll-up-button";
import DesktopSidebar from "./Sidebar/DesktopSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen px-4">
      <Header />
      <DesktopSidebar />
      <main className="h-full pb-2 pt-14 lg:ml-80">{children}</main>
      <ScrollUpButton />
    </div>
  );
}
