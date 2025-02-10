import { useLocation } from "react-router-dom";

import Header from "./Header";
import ScrollUpButton from "./Scroll-up-button";
import DesktopSidebar from "./Sidebar/DesktopSidebar";
import { Toaster } from "./ui/toaster";

import ModalProvider from "@/providers/modal-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isExcludedPage = ["/auth", "/forgot-password"].includes(pathname);
  return (
    <div className="h-screen px-4">
      <ModalProvider>
        {!isExcludedPage && <Header />}
        {!isExcludedPage && <DesktopSidebar />}

        <main
          className={`h-full ${!isExcludedPage ? "pb-2 pt-14 lg:ml-80" : ""}`}
        >
          {children}
        </main>
        {!isExcludedPage && <ScrollUpButton />}
        <Toaster />
      </ModalProvider>
    </div>
  );
}
