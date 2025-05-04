type NoChaptersProps = {
  error: string | null;
};

export function NoChapters({ error }: NoChaptersProps) {
  return (
    <section
      className="flex h-full items-center justify-center py-6"
      role="alert"
    >
      <span className="text-danger">{error}</span>
    </section>
  );
}
