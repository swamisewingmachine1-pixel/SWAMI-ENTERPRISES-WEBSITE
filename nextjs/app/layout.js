import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import TrackedLink from '../components/TrackedLink';
import NavBar from '../components/NavBar';
import SearchModal from '../components/SearchModal';
import PageOffset from '../components/PageOffset';

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
        <NavBar />
        <SearchModal />
        <PageOffset>{children}</PageOffset>
        <footer className="footer">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 'clamp(28px,4vw,40px)' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(28px,4.4vw,44px)', color: '#F7F7F5', letterSpacing: '-0.02em' }}>SWAMI ENTERPRISES</div>
              <div style={{ fontSize: 14, color: '#8A8A8A', marginTop: 16, maxWidth: 320, lineHeight: 1.6 }}>
                A Delhi-based dealer of JACK sewing machines — helping you find, install and maintain the right equipment for your production.
              </div>
              <TrackedLink
                href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer" event="whatsapp_click" props={{ location: 'footer' }}
                style={{ marginTop: 24, display: 'inline-block', padding: '13px 24px', border: '1px solid #F7F7F5', color: '#F7F7F5', fontSize: 13 }}
              >
                Talk to a Specialist
              </TrackedLink>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#5A5A5A', marginBottom: 16 }}>EXPLORE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="/machines" style={{ fontSize: 14, color: '#B0B0B0' }}>Machines</a>
                <a href="/industries" style={{ fontSize: 14, color: '#B0B0B0' }}>Industries</a>
                <a href="/solutions" style={{ fontSize: 14, color: '#B0B0B0' }}>Solutions</a>
                <a href="/finder" style={{ fontSize: 14, color: '#B0B0B0' }}>Find Your Machine</a>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#5A5A5A', marginBottom: 16 }}>COMPANY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="/about" style={{ fontSize: 14, color: '#B0B0B0' }}>About</a>
                <a href="/contact" style={{ fontSize: 14, color: '#B0B0B0' }}>Contact</a>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#5A5A5A', marginBottom: 16 }}>DELHI</div>
              <TrackedLink href="tel:+919971336656" event="call_click" props={{ location: 'footer' }} style={{ display: 'block', fontSize: 14, color: '#B0B0B0', marginBottom: 12 }}>
                +91 99713 36656
              </TrackedLink>
              <div style={{ fontSize: 14, color: '#B0B0B0' }}>E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi 110058</div>
            </div>
          </div>
          <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderTop: '1px solid rgba(247,247,245,0.14)', paddingTop: 24 }}>
            <div className="mono" style={{ fontSize: 11, color: '#5A5A5A' }}>AUTHORIZED JACK DEALER — DELHI</div>
            <div className="mono" style={{ fontSize: 11, color: '#5A5A5A' }}>© 2026 SWAMI ENTERPRISES</div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
