'use client';

import { usePathname } from 'next/navigation';

// Every page needs top padding to clear the fixed nav bar, except home — its hero is meant
// to sit full-bleed under the transparent-over-dark nav, same as the live site.
export default function PageOffset({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return <div className={isHome ? '' : 'page-offset'}>{children}</div>;
}
