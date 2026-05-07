'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image as ImageIcon, 
  LogOut, 
  Edit3, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Loader2,
  Search,
  Filter
} from 'lucide-react';
import { 
  login, 
  getStats, 
  updateOrder, 
  deleteOrder, 
  addGalleryItem, 
  deleteGalleryItem,
  getAllOrders,
  getAllGallery 
} from '@/app/actions';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Search & Filter
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('');

  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);

  // Gallery Modal State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    nama: '', kategori: '', deskripsi: '', harga: '', image: ''
  });

  const refreshData = async () => {
    setLoading(true);
    const [s, o, g] = await Promise.all([
      getStats(),
      getAllOrders(),
      getAllGallery()
    ]);
    
    if (s) setStats(s);
    if (o.success) setOrders(o.orders);
    if (g.success) setGallery(g.gallery);
    
    setLoading(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('dewiToken');
      if (token) {
        setIsLoggedIn(true);
        await refreshData();
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res.success) {
      localStorage.setItem('dewiToken', res.token);
      setIsLoggedIn(true);
      refreshData();
    } else {
      alert(res.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dewiToken');
    setIsLoggedIn(false);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    const res = await updateOrder(currentEditOrder.id, currentEditOrder);
    if (res.success) {
      setEditModalOpen(false);
      refreshData();
    } else {
      alert(res.error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus order ini?')) {
      const res = await deleteOrder(id);
      if (res.success) refreshData();
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    const res = await addGalleryItem(newGalleryItem);
    if (res.success) {
      setGalleryModalOpen(false);
      setNewGalleryItem({ nama: '', kategori: '', deskripsi: '', harga: '', image: '' });
      refreshData();
    } else {
      alert(res.error);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus item galeri ini?')) {
      const res = await deleteGalleryItem(id);
      if (res.success) refreshData();
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.nama.toLowerCase().includes(orderSearch.toLowerCase()) || o.noAntrian.includes(orderSearch);
    const matchesStatus = orderStatusFilter ? o.status === orderStatusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="card animate-fade-up" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
          <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '800', color: '#06b6d4', marginBottom: '8px' }}>DEWI TAILOR</h1>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '32px' }}>Admin Dashboard</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', width: '100%', padding: '12px', borderRadius: '8px', marginTop: '6px' }}
                required 
              />
            </div>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', width: '100%', padding: '12px', borderRadius: '8px', marginTop: '6px' }}
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '18px', color: '#94a3b8' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', backgroundColor: '#06b6d4', border: 'none' }}>
              Masuk Dashboard
            </button>
          </form>
          
          <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
            <p>Demo: <strong>dewi</strong> / <strong>dewi123</strong></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '24px', position: 'fixed', top: 0, bottom: 0 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#06b6d4', marginBottom: '40px' }}>DEWI TAILOR</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
              backgroundColor: activeTab === 'overview' ? '#0891b2' : 'transparent', color: 'white', fontWeight: '600', textAlign: 'left'
            }}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
              backgroundColor: activeTab === 'orders' ? '#0891b2' : 'transparent', color: 'white', fontWeight: '600', textAlign: 'left'
            }}
          >
            <ShoppingBag size={20} /> Manajemen Order
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
              backgroundColor: activeTab === 'gallery' ? '#0891b2' : 'transparent', color: 'white', fontWeight: '600', textAlign: 'left'
            }}
          >
            <ImageIcon size={20} /> Kelola Galeri
          </button>
          <div style={{ height: '1px', backgroundColor: '#334155', margin: '20px 0' }} />
          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
              color: '#f87171', fontWeight: '600', textAlign: 'left'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '40px' }}>
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>{activeTab === 'overview' ? 'Overview' : activeTab === 'orders' ? 'Manajemen Order' : 'Kelola Galeri'}</h1>
            <p style={{ color: '#94a3b8' }}>Selamat datang kembali, Admin Dewi.</p>
          </div>
          <button className="btn-primary" style={{ backgroundColor: '#0891b2' }} onClick={refreshData}>
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Refresh Data'}
          </button>
        </header>

        {activeTab === 'overview' && (
          <div className="animate-fade-up">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              <div className="card" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Order Aktif</p>
                  <TrendingUp size={20} color="#06b6d4" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#06b6d4' }}>{stats?.totalAktif || 0}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '5px' }}>Pesanan dalam antrian</p>
              </div>
              <div className="card" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '600' }}>Selesai Hari Ini</p>
                  <CheckCircle2 size={20} color="#10b981" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>{stats?.selesaiHariIni || 0}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '5px' }}>Update status hari ini</p>
              </div>
            </div>
            
            <div className="card" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Aksi Cepat</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-primary" onClick={() => setActiveTab('orders')} style={{ backgroundColor: '#334155', border: '1px solid #475569' }}>
                  Update Status Order
                </button>
                <button className="btn-primary" onClick={() => setActiveTab('gallery')} style={{ backgroundColor: '#334155', border: '1px solid #475569' }}>
                  Tambah Portfolio
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fade-up">
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Cari nama atau no antrian..." 
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  style={{ width: '100%', padding: '10px 10px 10px 40px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <select 
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                style={{ padding: '10px 16px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
              >
                <option value="">Semua Status</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Dikerjakan">Dikerjakan</option>
                <option value="Fitting">Fitting</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            <div className="card" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                    <th style={{ padding: '16px 24px' }}>No. Antrian</th>
                    <th style={{ padding: '16px 24px' }}>Pelanggan</th>
                    <th style={{ padding: '16px 24px' }}>Jenis</th>
                    <th style={{ padding: '16px 24px' }}>Status</th>
                    <th style={{ padding: '16px 24px' }}>Bayar</th>
                    <th style={{ padding: '16px 24px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '700', color: '#06b6d4' }}>{order.noAntrian}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <div>{order.nama}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{order.noHp}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>{order.jenis}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700',
                          backgroundColor: order.status === 'Selesai' ? '#10b981' : order.status === 'Dikerjakan' ? '#06b6d4' : '#f59e0b',
                          color: 'white'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ color: order.bayar === 'Lunas' ? '#10b981' : '#f87171', fontWeight: '600' }}>{order.bayar}</span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => { setCurrentEditOrder(order); setEditModalOpen(true); }} style={{ color: '#94a3b8' }}><Edit3 size={18} /></button>
                          <button onClick={() => handleDeleteOrder(order.id)} style={{ color: '#f87171' }}><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fade-up">
            <button onClick={() => setGalleryModalOpen(true)} className="btn-primary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} /> Tambah Item Galeri
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {gallery.map(item => (
                <div key={item.id} className="card" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: 0, overflow: 'hidden' }}>
                  <img src={item.image} alt={item.nama} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: '700' }}>{item.nama}</h3>
                      <button onClick={() => handleDeleteGallery(item.id)} style={{ color: '#f87171' }}><Trash2 size={18} /></button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '12px' }}>{item.deskripsi}</p>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#06b6d4' }}>{item.harga}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Order Modal */}
      {editModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Edit Order #{currentEditOrder.noAntrian}</h2>
              <button onClick={() => setEditModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleUpdateOrder}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label>Status</label>
                  <select 
                    value={currentEditOrder.status}
                    onChange={(e) => setCurrentEditOrder({...currentEditOrder, status: e.target.value})}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Dikerjakan">Dikerjakan</option>
                    <option value="Fitting">Fitting</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
                <div>
                  <label>Status Bayar</label>
                  <select 
                    value={currentEditOrder.bayar}
                    onChange={(e) => setCurrentEditOrder({...currentEditOrder, bayar: e.target.value})}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                  >
                    <option value="Belum">Belum</option>
                    <option value="Lunas">Lunas</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Estimasi Selesai</label>
                <input 
                  type="date" 
                  value={currentEditOrder.estimasiSelesai || ''}
                  onChange={(e) => setCurrentEditOrder({...currentEditOrder, estimasiSelesai: e.target.value})}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Harga (Rp)</label>
                <input 
                  type="number" 
                  value={currentEditOrder.harga || ''}
                  onChange={(e) => setCurrentEditOrder({...currentEditOrder, harga: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label>Catatan</label>
                <textarea 
                  value={currentEditOrder.catatan || ''}
                  onChange={(e) => setCurrentEditOrder({...currentEditOrder, catatan: e.target.value})}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', minHeight: '100px' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', backgroundColor: '#06b6d4', border: 'none' }}>Simpan Perubahan</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Gallery Modal */}
      {galleryModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Tambah Item Galeri</h2>
              <button onClick={() => setGalleryModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddGallery}>
              <div style={{ marginBottom: '16px' }}>
                <label>Nama Model</label>
                <input 
                  type="text" 
                  value={newGalleryItem.nama}
                  onChange={(e) => setNewGalleryItem({...newGalleryItem, nama: e.target.value})}
                  className="input-field"
                  style={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Kategori</label>
                <input 
                  type="text" 
                  value={newGalleryItem.kategori}
                  onChange={(e) => setNewGalleryItem({...newGalleryItem, kategori: e.target.value})}
                  className="input-field"
                  style={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>URL Gambar</label>
                <input 
                  type="text" 
                  value={newGalleryItem.image}
                  onChange={(e) => setNewGalleryItem({...newGalleryItem, image: e.target.value})}
                  className="input-field"
                  style={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Harga Display</label>
                <input 
                  type="text" 
                  value={newGalleryItem.harga}
                  onChange={(e) => setNewGalleryItem({...newGalleryItem, harga: e.target.value})}
                  className="input-field"
                  style={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label>Deskripsi</label>
                <textarea 
                  value={newGalleryItem.deskripsi}
                  onChange={(e) => setNewGalleryItem({...newGalleryItem, deskripsi: e.target.value})}
                  className="input-field"
                  style={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155', minHeight: '80px' }}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', backgroundColor: '#06b6d4', border: 'none' }}>Tambah Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
