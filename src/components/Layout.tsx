import { useLocation } from "react-router-dom";

import Header from "./Header";
import ScrollUpButton from "./Scroll-up-button";
import DesktopSidebar from "./Sidebar/DesktopSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/auth";
  return (
    <div className="h-screen px-4">
      {!isAuthPage && <Header />}
      {!isAuthPage && <DesktopSidebar />}

      <main className={`h-full ${!isAuthPage ? "pb-2 pt-14 lg:ml-80" : ""}`}>
        {children}
      </main>
      {!isAuthPage && <ScrollUpButton />}
    </div>
  );
}
