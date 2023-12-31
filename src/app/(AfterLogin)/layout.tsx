import NavMenu from '../_component/NavMenu';
import '../globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  return (
    <div className='flex h-[100dvh] w-[100dvw] items-center justify-center'>
      {!session && redirect('/')}
      <div>{children}</div>
      <NavMenu />
    </div>
  );
}
