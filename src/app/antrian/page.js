import db from '@/../lib/db';
import { Clock, Scissors, CheckCircle, Package } from 'lucide-react';

export const dynamic = 'force-dynamic';

function maskName(fullName) {
  if (!fullName || fullName.length < 2) return "***";
  const firstTwo = fullName.substring(0, 2);
  return firstTwo + "***";
}

function getStatusBadgeStyles(status) {
  switch (status) {
    case 'Menunggu': return { backgroundColor: '#f59e0b', color: 'white' };
    case 'Dikerjakan': return { backgroundColor: '#06b6d4', color: 'white' };
    case 'Fitting': return { backgroundColor: '#f97316', color: 'white' };
    case 'Selesai': return { backgroundColor: '#10b981', color: 'white' };
    default: return { backgroundColor: '#94a3b8', color: 'white' };
  }
}

async function getOrders() {
  try {
    const result = await db.execute('SELECT * FROM orders ORDER BY noAntrian ASC');
    return result.rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export default async function AntrianPage() {
  const orders = await getOrders();
  const activeOrders = orders.filter(o => o.status !== 'Selesai' || o.bayar !== 'Lunas');
  
  const stats = {
    total: activeOrders.length,
    dikerjakan: activeOrders.filter(o => o.status === 'Dikerjakan').length,
    menunggu: activeOrders.filter(o => o.status === 'Menunggu').length
  };

  const currentlyWorking = activeOrders.find(o => o.status === 'Dikerjakan');

  return (
    <div className="container page-transition" style={{ padding: '60px 0' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px' }}>Antrian Pengerjaan</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Pantau status real-time semua pesanan yang sedang diproses.</p>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(155, 107, 122, 0.1)', color: 'var(--primary)' }}>
            <Package size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Antrian Aktif</p>
            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.total}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
            <Scissors size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Sedang Dikerjakan</p>
            <p style={{ fontSize: '2rem', fontWeight: '800', color: '#06b6d4' }}>{stats.dikerjakan}</p>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Clock size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Menunggu Antrian</p>
            <p style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>{stats.menunggu}</p>
          </div>
        </div>
      </div>

      {/* Currently Working Highlight */}
      <div className="card" style={{ 
        marginBottom: '40px', 
        background: 'linear-gradient(to right, #fdf8f5, #ffffff)',
        borderLeft: '5px solid var(--primary)'
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--primary)', fontWeight: '700' }}>Sedang Dikerjakan Sekarang 🧵</h2>
        {currentlyWorking ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nomor Antrian</p>
              <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }}>{currentlyWorking.noAntrian}</p>
            </div>
            <div>
              <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{currentlyWorking.jenis}</p>
              <p style={{ color: 'var(--text-muted)' }}>Estimasi Selesai: <strong>{currentlyWorking.estimasiSelesai || '-'}</strong></p>
            </div>
            <div style={{ backgroundColor: '#06b6d4', color: 'white', padding: '8px 20px', borderRadius: '20px', fontWeight: '600' }}>
              In Progress
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>Tidak ada pesanan yang sedang dalam proses pengerjaan intensif.</p>
        )}
      </div>

      {/* Table Section */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Daftar Lengkap Antrian</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>No. Antrian</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>Nama</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>Jenis Pakaian</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>Status</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>Estimasi Selesai</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.length > 0 ? activeOrders.map((order) => (
                <tr key={order.noAntrian} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: 'var(--primary)' }}>{order.noAntrian}</td>
                  <td style={{ padding: '16px 24px' }}>{maskName(order.nama)}</td>
                  <td style={{ padding: '16px 24px' }}>{order.jenis}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700',
                      ...getStatusBadgeStyles(order.status)
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>{order.estimasiSelesai || '-'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Tidak ada antrian aktif saat ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.05)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '10px', color: '#b45309' }}>Status Keterangan</h3>
          <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', listStyle: 'none' }}>
            <li style={{ marginBottom: '5px' }}>🟠 <strong>Menunggu:</strong> Dalam antrian jadwal.</li>
            <li style={{ marginBottom: '5px' }}>🔵 <strong>Dikerjakan:</strong> Sedang diproses jahit.</li>
            <li style={{ marginBottom: '5px' }}>🟢 <strong>Selesai:</strong> Siap untuk diambil.</li>
          </ul>
        </div>
        <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: 'rgba(155, 107, 122, 0.05)', borderLeft: '4px solid var(--primary)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>🔒 Privasi:</strong> Nama pelanggan disamarkan demi keamanan data. Gunakan fitur "Cek Status" untuk melihat detail lengkap pesanan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
