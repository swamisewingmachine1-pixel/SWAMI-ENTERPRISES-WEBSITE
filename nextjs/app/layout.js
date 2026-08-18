import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import TrackedLink from '../components/TrackedLink';
import MobileNav from '../components/MobileNav';

export const metadata = {
  metadataBase: new URL('https://swamienterprises.online'),
  title: {
    default: 'Swami Enterprises — JACK Industrial Sewing Machines, Delhi',
    template: '%s — Swami Enterprises',
  },
  description:
    'Authorized Jack showroom in Chanakya Place, New Delhi. Industrial sewing machines, motors, spare parts, repair and AMC — trading on 30 Feet Road since 2015.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="nav">
          <a href="/" className="nav-brand">SWAMI ENTERPRISES</a>
          <div className="nav-links">
            <a href="/machines">Machines</a>
            <a href="/finder">Find Your Machine</a>
            <a href="/compare">Compare</a>
            <a href="/industries">Industries</a>
            <a href="/solutions">Solutions</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <TrackedLink href="tel:+919971336656" event="call_click" props={{ location: 'nav' }}>Call</TrackedLink>
            <TrackedLink
              href="https://wa.me/919971336656"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
              event="whatsapp_click"
              props={{ location: 'nav' }}
            >
              WhatsApp Us
            </TrackedLink>
          </div>
          <MobileNav />
        </nav>
        {children}
        <footer className="footer">
          <div>
            <strong style={{ color: '#fff' }}>Swami Enterprises</strong> — Authorized Jack Dealer
          </div>
          <div style={{ marginTop: 8 }}>E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi 110058</div>
          <div style={{ marginTop: 8 }}>
            <TrackedLink href="tel:+919971336656" event="call_click" props={{ location: 'footer' }}>+91 99713 36656</TrackedLink>
            {' '}&middot;{' '}
            <TrackedLink href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer" event="whatsapp_click" props={{ location: 'footer' }}>
              WhatsApp
            </TrackedLink>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
