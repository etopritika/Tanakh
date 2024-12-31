import DesktopSidebar from "./Sidebar/DesktopSidebar";
import Header from "./Header";
import ScrollUpButton from "./Scroll-up-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen px-4">
      <Header />
      <DesktopSidebar />
      <main className={`lg:ml-80 h-full pt-14 pb-2`}>{children}</main>
      <ScrollUpButton />
    </div>
  );
}
