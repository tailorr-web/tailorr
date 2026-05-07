import Link from 'next/link';
import db from '@/../lib/db';
import { Scissors, Ruler, Shirt, ArrowRight, Star, MapPin, Clock, Phone, Camera, Share2 } from 'lucide-react';

async function getGallery() {
  try {
    const result = await db.execute('SELECT * FROM gallery ORDER BY id DESC');
    return result.rows;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

export default async function Home() {
  const galleryItems = await getGallery();

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        background: 'linear-gradient(135deg, #2d1b1b 0%, #9B6B7A 100%)',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container animate-fade-up">
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-2px' }}>
            DEWI TAILOR
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: '300', marginBottom: '2.5rem', opacity: 0.9 }}>
            Jahitan Presisi, Keanggunan yang Berbicara
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/pre-order" className="btn-primary" style={{ backgroundColor: '#fff', color: '#2d1b1b', fontSize: '1.1rem' }}>
              Pre-Order Sekarang
            </Link>
            <Link href="#galeri" className="btn-outline" style={{ borderColor: '#fff', color: '#fff', fontSize: '1.1rem' }}>
              Lihat Galeri
            </Link>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '50px' }}>
            Keunggulan Layanan Kami
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div className="card">
              <Scissors size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Kualitas Jahitan</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Dikerjakan dengan ketelitian tinggi oleh penjahit berpengalaman untuk hasil yang rapi dan kuat.
              </p>
            </div>
            <div className="card">
              <Shirt size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Bahan Pelanggan</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Anda bebas memilih bahan favorit, kami fokus pada kualitas jahitan terbaik dan detail sempurna.
              </p>
            </div>
            <div className="card">
              <Ruler size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Custom Fitting</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Ukuran yang disesuaikan secara personal untuk memastikan kenyamanan dan estetika maksimal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" style={{ padding: '80px 0', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '10px' }}>Portfolio Kami</h2>
              <p style={{ color: 'var(--text-muted)' }}>Inspirasi busana dari karya-karya terbaik DEWI TAILOR.</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {galleryItems.map((item) => (
              <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '400px', backgroundColor: '#eee', position: 'relative' }}>
                  <img src={item.image} alt={item.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute', top: '20px', right: '20px', 
                    backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px 15px', 
                    borderRadius: '20px', fontWeight: '600', fontSize: '0.8rem' 
                  }}>
                    {item.kategori}
                  </div>
                </div>
                <div style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{item.nama}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{item.deskripsi}</p>
                  <p style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '1.1rem' }}>{item.harga}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="layanan" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '50px' }}>
            Layanan & Estimasi Harga
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Jenis Pakaian</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Kategori</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Estimasi Ongkos Jahit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Blouse / Atasan', 'Wanita Dewasa', 'Rp 80.000 – 150.000'],
                  ['Rok / Celana Wanita', 'Wanita Dewasa', 'Rp 75.000 – 120.000'],
                  ['Dress Casual', 'Wanita Dewasa', 'Rp 120.000 – 200.000'],
                  ['Dress Pesta', 'Wanita Dewasa', 'Rp 200.000 – 400.000'],
                  ['Gamis', 'Wanita Dewasa', 'Rp 150.000 – 300.000'],
                  ['Kebaya', 'Wanita Dewasa', 'Rp 250.000 – 500.000'],
                  ['Dress Anak', 'Anak Perempuan', 'Rp 75.000 – 150.000'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '15px' }}>{row[0]}</td>
                    <td style={{ padding: '15px' }}>{row[1]}</td>
                    <td style={{ padding: '15px' }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            ⚠️ Harga final ditentukan setelah fitting. Semua bahan dari pelanggan.
          </p>
        </div>
      </section>

      {/* Cara Pesan Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '50px' }}>
            Langkah Mudah Memesan
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {[
              ['1', 'Pre-Order Online', 'Lengkapi data busana yang ingin dijahit melalui form website kami.'],
              ['2', 'Jadwal Fitting', 'Kami akan mengkonfirmasi jadwal kedatangan Anda untuk pengukuran.'],
              ['3', 'Proses Jahit', 'Busana Anda mulai dikerjakan dengan penuh ketelitian dan kasih sayang.'],
              ['4', 'Fitting Akhir', 'Penyesuaian terakhir jika diperlukan untuk hasil yang sempurna.'],
              ['5', 'Selesai', 'Busana impian Anda siap diambil dan dikenakan.'],
            ].map((step) => (
              <div key={step[0]} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', 
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '1.5rem', fontWeight: '800', margin: '0 auto 20px'
                }}>
                  {step[0]}
                </div>
                <h3 style={{ marginBottom: '10px' }}>{step[1]}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer style={{ padding: '80px 0', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '20px' }}>DEWI TAILOR</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                Menghadirkan keanggunan melalui setiap jahitan. Dedikasi kami adalah memberikan kualitas terbaik untuk busana Anda.
              </p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E1306C', fontWeight: '600' }}>
                  <Camera size={24} /> Instagram
                </a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4267B2', fontWeight: '600' }}>
                  <Share2 size={24} /> Facebook
                </a>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '25px' }}>Kontak & Lokasi</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <MapPin size={24} color="var(--primary)" />
                  <p style={{ fontSize: '0.95rem' }}>Jl. Kenanga No. 12, Kota Seni, Indonesia</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Phone size={24} color="var(--primary)" />
                  <p style={{ fontSize: '0.95rem' }}>+62 851 2345 6789</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Clock size={24} color="var(--primary)" />
                  <div>
                    <p style={{ fontSize: '0.95rem' }}>Senin - Jumat: 10.00 - 17.00</p>
                    <p style={{ fontSize: '0.95rem' }}>Sabtu: 10.00 - 16.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Siap Tampil Anggun?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' }}>
                Booking antrian jahit Anda sekarang secara online.
              </p>
              <Link href="/pre-order" className="btn-primary" style={{ width: '100%' }}>
                Mulai Pre-Order <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div style={{ marginTop: '80px', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <p>&copy; {new Date().getFullYear()} DEWI TAILOR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
