import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function VerifiedUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value; 

  if (!token) {
    redirect('/en/login'); 
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="">{children}</main>
    </div>
  );
}
