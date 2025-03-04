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
      onClick={() => (window.location.href = redirectLink)}
    >
      <Link size={20} />
    </Button>
  );
}
