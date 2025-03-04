import { Link } from "lucide-react";

import { Button } from "../ui/button";

export default function RedirectButton({
  redirectLink,
}: {
  redirectLink: string;
}) {
  return (
    <Button
      variant="outline"
      className="bg-white p-2"
      onClick={() => window.open(redirectLink, "_blank", "noopener,noreferrer")}
    >
      <Link size={20} />
    </Button>
  );
}
