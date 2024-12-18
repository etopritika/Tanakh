import { useLocation } from "react-router-dom";
import MobileSidebar from "../Sidebar/MobileSidebar";
import SearchInput from "./Search-Input";

export default function Header() {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");
  return (
    <header
      className={`container mx-auto md:mx-0 md:max-w-none border-b flex justify-between md:justify-end p-1 ${
        isSearchPage ? "md:hidden" : ""
      }`}
    >
      <MobileSidebar />
      {!isSearchPage && <SearchInput />}
    </header>
  );
}
