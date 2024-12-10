export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header /> */}
      <main className="container mx-auto px-4">{children}</main>
    </>
  );
}
