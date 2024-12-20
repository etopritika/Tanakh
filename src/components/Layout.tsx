import DesktopSidebar from "./Sidebar/DesktopSidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import ScrollUpButton from "./Scroll-up-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <DesktopSidebar />
        <main
          className={`md:ml-80 ${
            isSearchPage ? "mt-14 py-2 md:mt-0" : "mt-14"
          }`}
        >
          {children}
        </main>
      </div>
      <ScrollUpButton />
    </>
  );
}
