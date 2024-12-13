import { Link } from "react-router-dom";

interface NoChaptersProps {
  sectionName: string;
}

export function NoChapters({ sectionName }: NoChaptersProps) {
  return (
    <section className="py-6">
      <div className="flex space-y-2 flex-col items-center">
        <span className="text-danger">Главы отсутствуют</span>
        <Link
          className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
          to={`/sections/${sectionName}/books`}
        >
          Назад
        </Link>
      </div>
    </section>
  );
}
