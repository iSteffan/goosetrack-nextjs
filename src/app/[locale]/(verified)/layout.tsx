export default function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="">{children}</main>
    </div>
  );
}
