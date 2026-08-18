export const metadata = {
  title: 'About',
  description: 'Swami Enterprises — Authorized Jack sewing machine dealer, Chanakya Place, New Delhi, trading since 2015.',
};

export default function AboutPage() {
  return (
    <main className="wrap" style={{ padding: '48px 0 100px', maxWidth: 700 }}>
      <h1 style={{ fontSize: 'clamp(32px,5vw,48px)' }}>About Swami Enterprises.</h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#333' }}>
        Authorized Jack showroom in Chanakya Place, New Delhi — 30 Feet Road, trading since 2015.
        Every machine on the floor is threaded and running, not shrink-wrapped in a box.
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#333' }}>
        We stock genuine Jack industrial sewing machines, motors and spare parts direct, and
        provide repair, servicing and annual maintenance — on what we sold you, and on most
        machines we didn&rsquo;t.
      </p>
    </main>
  );
}
