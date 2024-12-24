type NoChaptersProps = {
  error: string | null;
};

export function NoChapters({ error }: NoChaptersProps) {
  return (
    <section className="py-6 flex items-center justify-center h-full">
      <span className="text-danger">{error}</span>
    </section>
  );
}
