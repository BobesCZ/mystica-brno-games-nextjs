import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { SessionProvider } from './_components/SessionProvider';
import { ReactNode } from 'react';
import { Layout } from './_components/Layout';
import { getUserAuthRecords } from '@/actions/userAuth';

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const userAuthRecords = await getUserAuthRecords();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Layout userAuthRecords={userAuthRecords}>{children}</Layout>
    </SessionProvider>
  );
}
