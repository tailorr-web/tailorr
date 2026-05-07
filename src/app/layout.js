import './globals.css';
import Navbar from '@/components/Navbar';
import DisableDevTools from '@/components/DisableDevTools';

export const metadata = {
  title: 'Dewi Tailor - Premium Tailoring Service',
  description: 'Jasa penjahit premium untuk segala kebutuhan busana Anda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <DisableDevTools />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
