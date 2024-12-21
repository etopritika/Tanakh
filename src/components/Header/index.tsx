import { useLocation } from "react-router-dom";
import MobileSidebar from "../Sidebar/MobileSidebar";
import SearchInput from "./Search-Input";

export default function Header() {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");
  return (
    <header
      className={`fixed top-0 left-0 h-14 w-full mx-auto bg-background z-50 border-b flex justify-between md:justify-end px-4 py-1 ${
        isSearchPage ? "md:hidden" : ""
      }`}
    >
      <MobileSidebar />
      {!isSearchPage && <SearchInput />}
    </header>
  );
}
