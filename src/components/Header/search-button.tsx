import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface SearchButtonProps {
  pathSegments: string[];
}

export default function SearchButton({ pathSegments }: SearchButtonProps) {
  const navigate = useNavigate();

  if (pathSegments[2] === "search" || pathSegments.length === 1) {
    return null;
  }

  return (
    <Button onClick={() => navigate(`/sections/${pathSegments[1]}/search`)}>
      <Search />
    </Button>
  );
}
