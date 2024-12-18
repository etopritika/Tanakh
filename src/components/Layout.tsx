import DesktopSidebar from "./Sidebar/DesktopSidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");
  return (
    <>
      <Header />
      <div
        className={`flex py-1 md:p-1 ${
          isSearchPage
            ? "h-[calc(100vh-55px)] md:h-screen"
            : "h-[calc(100vh-55px)]"
        }`}
      >
        <DesktopSidebar />
        <main className="container mx-auto px-4 h-full">{children}</main>
      </div>
    </>
  );
}
