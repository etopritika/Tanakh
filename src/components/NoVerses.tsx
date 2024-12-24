type NoVersesProps = {
  error: string | null;
};

export function NoVerses({ error }: NoVersesProps) {
  return (
    <section className="py-6 flex items-center justify-center h-full">
      <span className="text-danger">{error}</span>
    </section>
  );
}
