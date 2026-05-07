'use client';

import { useState } from 'react';
import { Search, Loader2, AlertCircle, Phone, Info } from 'lucide-react';
import { searchOrderByName } from '@/app/actions';

export default function CekStatusPage() {
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!nama.trim()) return;

    setLoading(true);
    setError(null);
    setOrderData(null);

    const res = await searchOrderByName(nama.trim());
    
    setLoading(false);
    if (res.success) {
      setOrderData(res);
    } else {
      setError(res.error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Menunggu': return '#f59e0b';
      case 'Dikerjakan': return '#06b6d4';
      case 'Fitting': return '#f97316';
      case 'Selesai': return '#10b981';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="container" style={{ padding: '60px 0', maxWidth: '800px' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Cek Status Pesanan</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Masukkan nama Anda untuk melihat progress jahitan terbaru.</p>

        {/* Search Box */}
        <div className="card" style={{ marginBottom: '40px', padding: '32px' }}>
          <form onSubmit={handleSearch}>
            <label htmlFor="search" style={{ fontWeight: '600', marginBottom: '12px', display: 'block' }}>Nama Lengkap</label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                <input 
                  type="text" 
                  id="search" 
                  value={nama} 
                  onChange={(e) => setNama(e.target.value)} 
                  className="input-field" 
                  placeholder="Contoh: Siti Rahma" 
                  style={{ marginBottom: '0', paddingLeft: '45px' }}
                  required
                />
                <Search size={20} style={{ position: 'absolute', left: '15px', top: '15px', color: 'var(--text-muted)' }} />
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ minWidth: '140px' }}>
                {loading ? <Loader2 className="animate-spin" /> : 'Cari Pesanan'}
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px' }}>
              ⚠️ Masukkan nama yang sama persis seperti yang Anda daftarkan saat pre-order.
            </p>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="card animate-fade-up" style={{ borderLeft: '4px solid #ef4444', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <AlertCircle color="#ef4444" size={24} />
              <div>
                <h3 style={{ color: '#ef4444', marginBottom: '8px' }}>Pesanan Tidak Ditemukan</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Maaf, kami tidak menemukan pesanan atas nama "<strong>{nama}</strong>". Pastikan ejaan nama benar.
                </p>
                <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px' }}>Butuh bantuan?</p>
                  <a href="https://wa.me/6285123456789" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                    <Phone size={16} /> Hubungi Admin via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result State */}
        {orderData && (
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Status Hero Card */}
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #fdf8f5 0%, #ffffff 100%)', 
              padding: '40px', textAlign: 'center', position: 'relative', overflow: 'hidden' 
            }}>
              <div style={{ 
                position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', 
                backgroundColor: 'rgba(201, 147, 59, 0.05)', borderRadius: '50%' 
              }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px' }}>NOMOR ANTRIAN</p>
              <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--primary)', lineHeight: 1, marginBottom: '24px' }}>
                {orderData.order.noAntrian}
              </h2>
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '8px', 
                padding: '10px 24px', borderRadius: '30px', backgroundColor: getStatusColor(orderData.order.status),
                color: 'white', fontWeight: '700', fontSize: '1.1rem'
              }}>
                Status: {orderData.order.status}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Detail Info */}
              <div className="card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Detail Pesanan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Jenis:</span>
                    <strong>{orderData.order.jenis}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Nama:</span>
                    <strong>{orderData.order.nama}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Tgl Masuk:</span>
                    <strong>{orderData.order.tglMasuk}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary-dark)' }}>
                    <span style={{ fontWeight: '600' }}>Estimasi Selesai:</span>
                    <strong>{orderData.order.estimasiSelesai || '-'}</strong>
                  </div>
                </div>
              </div>

              {/* Queue Position */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>POSISI ANTRIAN</p>
                <h3 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#f59e0b', marginBottom: '5px' }}>#{orderData.position}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Dari total {orderData.totalActive} antrian aktif</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Informasi Pembayaran</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Biaya:</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                    {orderData.order.harga > 0 ? `Rp ${orderData.order.harga.toLocaleString('id-ID')}` : 'Menunggu Fitting'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status Bayar:</p>
                  <span style={{ 
                    padding: '4px 12px', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '0.75rem',
                    backgroundColor: orderData.order.bayar === 'Lunas' ? '#10b981' : '#ef4444'
                  }}>
                    {orderData.order.bayar}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes if any */}
            {orderData.order.catatan && (
              <div className="card" style={{ borderLeft: '4px solid #06b6d4' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px' }}>Catatan dari Penjahit:</h3>
                <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>"{orderData.order.catatan}"</p>
              </div>
            )}

            <div style={{ backgroundColor: 'rgba(201, 147, 59, 0.05)', padding: '24px', borderRadius: '12px', display: 'flex', gap: '16px' }}>
              <Info color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '5px' }}>Tips Pantau Pesanan</p>
                <p>Simpan halaman ini untuk melihat perubahan status. Kami juga akan menginfokan via WhatsApp jika pesanan Anda sudah siap untuk diambil.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
