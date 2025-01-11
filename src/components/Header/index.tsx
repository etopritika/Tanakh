import BackToBooksLink from "./Back-To-Books-Link";
import BackToChaptersLink from "./Back-To-Chapters-Link";
import SearchBackLink from "./Search-Back-Link";
import SearchLink from "./Search-Link";
import MobileSidebar from "../Sidebar/MobileSidebar";

function HeaderLinks() {
  return (
    <>
      <div className="flex items-center">
        <MobileSidebar />
        <SearchBackLink />
        <BackToBooksLink />
        <BackToChaptersLink />
      </div>
      <SearchLink />
    </>
  );
}

export default function Header() {
  return (
    <header
      className={`fixed right-0 top-0 z-50 mx-auto flex h-14 w-full justify-between border-b bg-background px-4 py-1 lg:pl-80`}
    >
      <HeaderLinks />
    </header>
  );
}
