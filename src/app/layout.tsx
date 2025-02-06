import { useParams } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useParams();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
