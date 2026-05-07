import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          DEWI TAILOR
        </Link>
        <div className="nav-links">
          <Link href="/">Beranda</Link>
          <Link href="/pre-order">Pre-Order</Link>
          <Link href="/antrian">Antrian</Link>
          <Link href="/cek-status">Cek Status</Link>
        </div>
      </div>
    </nav>
  );
}
