import { fetchChapterData } from "@/lib/api";
import { useEffect } from "react";

export default function VersesPage() {
  useEffect(() => {
    const loadChapter = async () => {
      const data = await fetchChapterData("tora", "beresheet", {
        key: 1,
        start: 0,
        end: 32,
      });
      console.log(data);
    };

    loadChapter();
  }, []);
  return <span>VersesPage</span>;
}
