export default function HomepageVerseList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="space-y-4">{children}</ul>;
}
