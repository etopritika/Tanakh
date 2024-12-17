import MobileSidebar from "../Sidebar/MobileSidebar";

export default function Header() {
  return (
    <header className="container md:hidden mx-auto px-4">
      <MobileSidebar />
    </header>
  );
}
