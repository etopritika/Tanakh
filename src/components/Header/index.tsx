import BackToBooksLink from "./BackToBooksLink";
import BackToChaptersLink from "./BackToChaptersLink";
import SearchBackLink from "./SearchBackLink";
import SearchLink from "./SearchLink";
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
      className={`fixed right-0 top-0 z-50 mx-auto flex h-14 w-full justify-between border-b bg-background px-2 py-1 sm:px-4 lg:pl-80`}
    >
      <HeaderLinks />
    </header>
  );
}
