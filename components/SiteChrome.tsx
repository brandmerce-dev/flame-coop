'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';
import ScrollReveal from './ScrollReveal';
import RequestInfoModal from './RequestInfoModal';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>{children}</main>
      <ScrollReveal />
      <RequestInfoModal />
    </>
  );
}
