import './globals.css';

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
            <a href="/about">About</a>
            <a href="tel:+919971336656">Call</a>
            <a className="btn btn-dark" href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div>
            <strong style={{ color: '#fff' }}>Swami Enterprises</strong> — Authorized Jack Dealer
          </div>
          <div style={{ marginTop: 8 }}>E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi 110058</div>
          <div style={{ marginTop: 8 }}>
            <a href="tel:+919971336656">+91 99713 36656</a> &middot;{' '}
            <a href="https://wa.me/919971336656" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
