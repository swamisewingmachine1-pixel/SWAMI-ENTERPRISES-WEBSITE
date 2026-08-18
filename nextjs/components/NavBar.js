'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TrackedLink from './TrackedLink';
import MobileNav from './MobileNav';

// Matches the live site's real nav bar spec, measured directly off swamienterprises.online:
// fixed, 52px tall, 0 40px padding, rgba(20,20,20,0.55) bg with 20px backdrop-blur and a
// 1px rgba(255,255,255,0.12) bottom border while dark; switches to a light, opaque bar once
// scrolled past the hero (there's no dark hero on any page but home, so those stay light always).
export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [dark, setDark] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setDark(false);
      return;
    }
    function onScroll() {
      setDark(window.scrollY < window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const navText = dark ? '#F7F7F5' : '#151515';
  const navBg = dark ? 'rgba(20,20,20,0.55)' : 'rgba(247,247,245,0.82)';
  const navBorder = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';

  const links = [
    ['Home', '/'],
    ['Machines', '/machines'],
    ['Industries', '/industries'],
    ['Solutions', '/solutions'],
    ['Find Your Machine', '/finder'],
    ['About', '/about'],
    ['Compare', '/compare'],
  ];

  return (
    <>
      {/* Mobile bar — always visible under 860px, brand + hamburger only */}
      <div
        className="nav-mobile-bar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 76, zIndex: 1000, display: 'none',
          alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
        }}
      >
        <a href="/" style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', color: dark ? '#F7F7F5' : '#151515' }}>
          SWAMI ENTERPRISES
        </a>
        <MobileNav color={dark ? '#F7F7F5' : '#151515'} />
      </div>

      {/* Desktop bar — matches live site: 52px, blur, theme-switching */}
      <div
        className="nav-desktop-bar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 1001,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(24px,3vw,40px)', background: navBg,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${navBorder}`, transition: 'background 0.4s ease',
        }}
      >
        <a href="/" style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', color: navText }}>
          SWAMI ENTERPRISES
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(22px,2.2vw,34px)' }}>
          {links.map(([label, href]) => (
            <a
              key={href} href={href}
              style={{ fontSize: 12, fontWeight: 400, color: navText, opacity: pathname === href ? 1 : 0.7 }}
            >
              {label}
            </a>
          ))}
        </div>
        <TrackedLink
          href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer"
          event="whatsapp_click" props={{ location: 'nav' }}
          style={{ fontSize: 12, fontWeight: 500, color: navText, whiteSpace: 'nowrap' }}
        >
          Talk to a Specialist
        </TrackedLink>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-mobile-bar { display: flex !important; }
          .nav-desktop-bar { display: none !important; }
        }
      `}</style>
    </>
  );
}
