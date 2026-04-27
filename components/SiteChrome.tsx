'use client';

import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith('/keystatic');

  if (isStudio) return <>{children}</>;

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '72px' }}>{children}</main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
