import { useState, useEffect } from "react";

import { Verse } from "@/lib/types";

export default function TestDropdown({
  //   verse,
  //   onCopy,
  //   highlightColor,
  //   docId,
  children,
}: {
  verse: Verse;
  onCopy: () => void;
  highlightColor: string;
  docId: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      console.log(newState ? "open" : "close");
      return newState;
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      setIsOpen(false);
      console.log("close");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <div>
      <div onClick={handleToggle} className="w-full cursor-pointer space-y-2">
        {children}
      </div>
      {isOpen && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f0f0f0",
            border: "1px solid #ccc",
          }}
        >
          Тестовий дропдаун
        </div>
      )}
    </div>
  );
}
