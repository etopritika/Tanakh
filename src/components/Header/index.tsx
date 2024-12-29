import { Link, useLocation } from "react-router-dom";
import MobileSidebar from "../Sidebar/MobileSidebar";
import { Search } from "lucide-react";
import BackToChaptersLink from "./Back-To-Chapters-Link";
import BackToBooksLink from "./Back-To-Books-Link";
import SearchBackLink from "./Search-Back-Link";

export default function Header() {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");
  return (
    <header
      className={`fixed top-0 right-0 h-14 w-full mx-auto lg:pl-80 bg-background z-50 border-b flex justify-between px-4 py-1`}
    >
      <div className="flex items-center">
        <MobileSidebar />
        <SearchBackLink />
        <BackToBooksLink />
        <BackToChaptersLink />
      </div>
      {!isSearchPage && (
        <Link to={"/search"} className="px-3 py-0.5 flex items-center">
          <Search />
        </Link>
      )}
    </header>
  );
}
