import { cookies } from 'next/headers';

export async function getServerTheme(): Promise<'light' | 'dark'> {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;

  if (theme === 'dark' || theme === 'light') return theme;
  return 'light';
}
