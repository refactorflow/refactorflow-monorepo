import { auth } from '@/configuration/server/auth';
import { LoginButton } from '@/features/authentication/login-button';

export default async function HomePage() {
  const session = await auth();
  console.log(session?.sessionToken);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginButton />
    </main>
  );
}
