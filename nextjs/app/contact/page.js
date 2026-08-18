import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Talk to a specialist at Swami Enterprises — Chanakya Place, New Delhi. Call, WhatsApp, or send a message.',
};

export default function ContactPage() {
  return (
    <main className="wrap" style={{ padding: '48px 0 100px', maxWidth: 600 }}>
      <h1 style={{ fontSize: 'clamp(32px,5vw,48px)' }}>Talk to Swami.</h1>
      <p style={{ color: '#707070' }}>E-2/73, 30 Feet Road, Block C, Chanakya Place I, New Delhi 110058</p>
      <ContactForm />
    </main>
  );
}
