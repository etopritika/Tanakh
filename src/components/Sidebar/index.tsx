import { useLocation } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

export default function Sidebar() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const currentBook = pathSegments.at(1) || null;

  return (
    <>
      <DesktopSidebar currentBook={currentBook} />
      <MobileSidebar currentBook={currentBook} />
    </>
  );
}
