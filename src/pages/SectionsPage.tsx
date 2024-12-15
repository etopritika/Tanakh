import { SectionList } from "@/components/SectionList";
import { sections } from "@/lib/routes";

export default function SectionsPage() {
  return (
    <section className="py-6">
      <SectionList sections={sections} />
    </section>
  );
}
