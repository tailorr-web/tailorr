'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Check, AlertTriangle } from 'lucide-react';
import { createOrder } from '@/app/actions';

export default function PreOrderPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    kategori: 'Wanita Dewasa',
    jenis: '',
    deskripsi: '',
    keterangan: '',
    jumlah: 1,
    nama: '',
    noHp: '',
    tanggalFitting: '',
    metode: ''
  });

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createOrder(formData);
    setLoading(false);
    if (res.success) {
      setResult(res);
    } else {
      alert("Error: " + res.error);
    }
  };

  if (result) {
    return (
      <div className="container" style={{ padding: '80px 0', maxWidth: '600px' }}>
        <div className="card animate-fade-up" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#10B981',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            color: 'white'
          }}>
            <Check size={40} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px', color: '#10B981' }}>Pre-Order Berhasil!</h1>
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '24px', borderRadius: 'var(--radius)', marginBottom: '24px', border: '2px dashed #10B981' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Nomor Antrian Anda:</p>
            <p style={{ fontSize: '3.5rem', fontWeight: '800', color: '#10B981', lineHeight: 1 }}>{result.noAntrian}</p>
          </div>
          <p style={{ marginBottom: '32px', color: 'var(--text-muted)' }}>
            Terima kasih telah memilih DEWI TAILOR. Kami akan mengkonfirmasi jadwal fitting Anda melalui WhatsApp.
          </p>
          <Link href="/" className="btn-primary" style={{ width: '100%' }}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 0', maxWidth: '700px' }}>
      <div className="animate-fade-up">
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '12px', textAlign: 'center' }}>Form Pre-Order</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>Lengkapi data di bawah untuk booking antrian jahitan Anda.</p>

        {/* Progress Stepper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', top: '20px', left: '0', right: '0', height: '2px', 
            backgroundColor: 'var(--border)', zIndex: -1 
          }} />
          <div style={{ 
            position: 'absolute', top: '20px', left: '0', width: `${((step - 1) / (totalSteps - 1)) * 100}%`, 
            height: '2px', backgroundColor: 'var(--primary)', zIndex: -1, transition: 'width 0.3s ease' 
          }} />
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{ textAlign: 'center', width: '80px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                backgroundColor: s <= step ? 'var(--primary)' : 'var(--surface)',
                border: `2px solid ${s <= step ? 'var(--primary)' : 'var(--border)'}`,
                color: s <= step ? 'white' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px', fontWeight: '700', transition: 'all 0.3s ease'
              }}>
                {s < step ? <Check size={20} /> : s}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: s <= step ? 'var(--text-main)' : 'var(--text-muted)' }}>
                {s === 1 ? 'Jenis' : s === 2 ? 'Detail' : s === 3 ? 'Kontak' : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ padding: '40px' }}>
          {step === 1 && (
            <div className="page-transition">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Pilih Jenis Pakaian</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label>Kategori Pelanggan</label>
                <div style={{ display: 'flex', gap: '24px', marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="kategori" value="Wanita Dewasa" checked={formData.kategori === 'Wanita Dewasa'} onChange={handleInputChange} />
                    <span>Wanita Dewasa</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="kategori" value="Anak Perempuan" checked={formData.kategori === 'Anak Perempuan'} onChange={handleInputChange} />
                    <span>Anak Perempuan</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="jenis">Jenis Pakaian</label>
                <select id="jenis" name="jenis" value={formData.jenis} onChange={handleInputChange} className="input-field" required>
                  <option value="">-- Pilih jenis pakaian --</option>
                  <optgroup label="Pilihan Populer">
                    <option value="Dress">Dress</option>
                    <option value="Kebaya">Kebaya</option>
                    <option value="Gamis">Gamis</option>
                    <option value="Blouse">Blouse / Atasan</option>
                    <option value="Rok">Rok</option>
                  </optgroup>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="page-transition">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Keterangan Pakaian</h2>
              
              <div>
                <label htmlFor="deskripsi">Deskripsi Model / Keinginan</label>
                <textarea id="deskripsi" name="deskripsi" value={formData.deskripsi} onChange={handleInputChange} className="input-field" style={{ minHeight: '120px' }} placeholder="Jelaskan model yang Anda inginkan secara detail..." required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label htmlFor="jumlah">Jumlah (pcs)</label>
                  <input type="number" id="jumlah" name="jumlah" value={formData.jumlah} onChange={handleInputChange} className="input-field" min="1" required />
                </div>
                <div>
                  <label htmlFor="keterangan">Catatan Tambahan</label>
                  <input type="text" id="keterangan" name="keterangan" value={formData.keterangan} onChange={handleInputChange} className="input-field" placeholder="Warna, ukuran, dll" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="page-transition">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Data Kontak & Jadwal</h2>
              
              <div>
                <label htmlFor="nama">Nama Lengkap</label>
                <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleInputChange} className="input-field" placeholder="Masukkan nama lengkap Anda" required />
              </div>

              <div>
                <label htmlFor="noHp">Nomor WhatsApp</label>
                <input type="tel" id="noHp" name="noHp" value={formData.noHp} onChange={handleInputChange} className="input-field" placeholder="Contoh: 08123456789" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label htmlFor="tanggalFitting">Rencana Fitting</label>
                  <input type="date" id="tanggalFitting" name="tanggalFitting" value={formData.tanggalFitting} onChange={handleInputChange} className="input-field" required />
                </div>
                <div>
                  <label htmlFor="metode">Metode Pembayaran</label>
                  <select id="metode" name="metode" value={formData.metode} onChange={handleInputChange} className="input-field" required>
                    <option value="">-- Pilih --</option>
                    <option value="Tunai">Tunai</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="QRIS">QRIS</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="page-transition">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Konfirmasi Pesanan</h2>
              
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pakaian:</span>
                  <strong>{formData.jenis} ({formData.kategori})</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Jumlah:</span>
                  <strong>{formData.jumlah} pcs</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Model:</span>
                  <span style={{ fontSize: '0.9rem' }}>{formData.deskripsi}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '15px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pelanggan:</span>
                  <strong>{formData.nama}</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Fitting:</span>
                  <strong>{formData.tanggalFitting}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', backgroundColor: 'rgba(201, 147, 59, 0.1)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <AlertTriangle color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--primary-dark)' }}>
                  Penting: Estimasi harga dan waktu pengerjaan akan ditentukan setelah sesi fitting di butik kami.
                </p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="btn-outline">
                <ChevronLeft size={20} /> Sebelumnya
              </button>
            ) : <div />}
            
            {step < totalSteps ? (
              <button type="button" onClick={nextStep} className="btn-primary" disabled={
                (step === 1 && !formData.jenis) || 
                (step === 2 && !formData.deskripsi) ||
                (step === 3 && (!formData.nama || !formData.noHp || !formData.tanggalFitting || !formData.metode))
              }>
                Selanjutnya <ChevronRight size={20} />
              </button>
            ) : (
              <button type="submit" className="btn-primary" disabled={loading} style={{ backgroundColor: '#10B981' }}>
                {loading ? 'Mengirim...' : 'Konfirmasi Pre-Order ✓'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
