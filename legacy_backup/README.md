# DEWI TAILOR - Website Manajemen Penjahit

Website profesional untuk DEWI TAILOR, usaha jahit pakaian khusus wanita dan anak perempuan dengan sistem manajemen order dan antrian modern.

## 📋 Fitur Utama

### 👥 Untuk Pelanggan (Publik)

- **Landing Page** - Halaman utama dengan galeri hasil jahitan, keunggulan layanan, dan informasi kontak
- **Form Pre-Order 4 Langkah** - Pendaftaran antrian dengan wizard yang user-friendly
- **Halaman Antrian Publik** - Transparansi antrian real-time dengan penyamaran nama
- **Cek Status Order** - Pelanggan dapat mengecek status pesanan mereka menggunakan nama

### 🎯 Untuk Admin (Dashboard Tertutup)

- **Dashboard Overview** - Statistik pesanan, deadline dekat, belum ada estimasi
- **Manajemen Order** - Edit status, estimasi selesai, harga, pembayaran, dan catatan per order
- **Filter & Pencarian** - Cari pesanan berdasarkan nama, status, dan pembayaran
- **Kelola Galeri** - Tambah, edit, hapus item galeri dari dashboard

## 📂 Struktur File

```
d:/Project/
├── index.html           # Landing page & beranda
├── form-preorder.html   # Form pre-order 4 langkah
├── antrian.html         # Halaman antrian publik
├── cek-status.html      # Halaman cek status pesanan
├── admin.html           # Dashboard admin dengan login
└── README.md            # File dokumentasi ini
```

## 🎨 Desain & Warna

### Tema Publik (Pelanggan)

- **Warna Utama**: Mauve/Rose (#9B6B7A) - elegan & feminin
- **Warna Sekunder**: Gold (#C9A84C) - aksen premium
- **Background**: Putih Hangat (#FDF8F5)
- **Font**: Playfair Display (judul), Poppins (body)

### Tema Admin (Dark Modern)

- **Background**: Dark Slate (#0F172A)
- **Sidebar**: Dark Navy (#1E293B)
- **Aksen**: Cyan (#06B6D4) - professional & modern
- **Font**: Inter (clean & professional)

### Status Colors

- 🟡 **Menunggu**: Amber (#F59E0B)
- 🔵 **Sedang Dikerjakan**: Cyan (#06B6D4)
- 🟠 **Fitting/Revisi**: Orange (#F97316)
- 🟢 **Selesai**: Emerald (#10B981)
- ❌ **Belum Lunas**: Red (#EF4444)
- ✅ **Lunas**: Green (#22C55E)

## 🚀 Cara Menggunakan

### 1. Akses Halaman Pelanggan

1. Buka `index.html` di browser
2. Pelanggan dapat melihat:
   - Galeri hasil jahitan
   - Layanan dan estimasi harga
   - Cara pesan (4 langkah)
   - Informasi kontak

### 2. Pre-Order

1. Klik "Pre-Order Sekarang"
2. Isi form 4 langkah:
   - **Langkah 1**: Pilih kategori dan jenis pakaian
   - **Langkah 2**: Deskripsi model dan detail
   - **Langkah 3**: Data pelanggan (nama, HP, jadwal fitting)
   - **Langkah 4**: Konfirmasi dan review
3. Dapatkan nomor antrian otomatis

### 3. Cek Antrian Publik

1. Buka `antrian.html`
2. Lihat daftar pesanan yang sedang dikerjakan
3. Nama ditampilkan dengan format samar (Si\*\*\*)
4. Update otomatis setiap 30 detik

### 4. Cek Status Order

1. Buka `cek-status.html`
2. Masukkan nama lengkap sesuai saat pre-order
3. Lihat detail: nomor antrian, status, estimasi, pembayaran

### 5. Dashboard Admin

1. Buka `admin.html`
2. Login dengan:
   - **Username**: `dewi`
   - **Password**: `dewi123`
3. Akses fitur:
   - 📊 **Overview** - Statistik realtime
   - 📋 **Manajemen Order** - Edit status, harga, estimasi
   - 🖼️ **Kelola Galeri** - Tambah/edit/hapus item

## 💾 Data Storage

**Sistem Backend Real-Time dengan Express.js + SQLite3:**

- **Database**: SQLite3 dengan tabel `orders`, `gallery`, dan `admin`
- **API Endpoints**: 11 RESTful endpoints untuk CRUD operations
- **Authentication**: JWT tokens untuk keamanan admin endpoints
- **Auto-Increment**: Nomor antrian otomatis terbuat setiap pre-order

Untuk setup lengkap, lihat **[backend/SETUP.md](backend/SETUP.md)**

**Kredensial Default Admin:**

- Username: `dewi`
- Password: `dewi123`

## 🚀 Cara Menjalankan Aplikasi

### Setup Backend (Diperlukan)

1. Buka terminal di folder `backend`:

   ```bash
   cd backend
   npm install
   npm start
   ```

2. Server akan berjalan di `http://localhost:3000`

3. Output yang muncul:
   ```
   ✅ Connected to SQLite database
   ✅ Default admin user created: dewi / dewi123
   ✅ Gallery items seeded
   ✅ Sample orders seeded
   🚀 Server running at http://localhost:3000
   ```

### Akses Frontend

1. Buka browser ke `http://localhost` (atau file langsung jika offline)
2. Semua halaman otomatis terhubung ke API di port 3000
3. Jika backend tidak running, aplikasi akan menampilkan warning

## 📱 Responsivitas

Semua halaman sudah responsif:

- **Mobile** (< 640px): 1 kolom, hamburger menu, tombol besar
- **Tablet** (640px - 1024px): 2 kolom, navigasi semi-collapsed
- **Desktop** (> 1024px): Layout penuh, sidebar tetap, tabel lebar

## 🔧 Teknologi Stack

### Frontend

- **HTML5** - Struktur markup
- **CSS3 & Tailwind CSS** - Styling (via CDN)
- **JavaScript Vanilla** - Interaktivitas (Fetch API untuk backend communication)
- **Google Fonts** - Font premium (Playfair Display, Poppins, Inter)

### Backend

- **Node.js + Express.js** - Web server & API routing
- **SQLite3** - Database lokal dengan auto-sync
- **jsonwebtoken (JWT)** - Keamanan authentication admin
- **CORS & body-parser** - Middleware untuk request handling

### Deployment Ready

- Static files serving dari Express
- CORS enabled untuk cross-origin requests
- Environment-ready struktur (dapat dipindah ke PostgreSQL/MySQL)
- Error handling & logging di semua endpoints

## 📌 Catatan Penting

1. **Tidak Ada Login Pelanggan** - Pelanggan dapat mengakses semua fitur publik tanpa akun
2. **Sistem DP Tidak Ada** - Pembayaran penuh saat pengambilan
3. **Bahan dari Pelanggan** - Pelanggan membawa bahan sendiri
4. **Fitting Wajib** - Setiap pelanggan harus datang ke tempat untuk fitting
5. **Admin Tunggal** - Hanya 1 akun admin (pemilik usaha)

## 🎯 Alur Penggunaan Lengkap

```
PELANGGAN
1. Pre-Order Online (isi form) → dapat nomor antrian
2. Datang Fitting sesuai jadwal → serahkan kain
3. Admin update estimasi & harga
4. Pelanggan pantau status online
5. Status berubah → Selesai
6. Ambil pakaian → Bayar tunai/non-tunai

ADMIN
1. Login ke dashboard
2. Lihat overview statistik
3. Terima order dari form pelanggan
4. Input estimasi setelah fitting
5. Update status & harga per order
6. Tandai pembayaran lunas
7. Kelola galeri dengan foto terbaru
```

## ✅ Fitur Sprint 1 (Sudah Termasuk)

- ✅ Landing page + Hero + Galeri + Cara Pesan
- ✅ Form pre-order 4 langkah
- ✅ Halaman antrian publik
- ✅ Dashboard admin dengan login
- ✅ Manajemen order (status, estimasi, pembayaran)
- ✅ Kelola galeri dari admin

## 🚀 Fitur Sprint 2+ (Future Enhancement)

- [ ] Notifikasi WhatsApp otomatis
- [ ] Export data ke Excel/PDF
- [ ] Multi-admin support
- [ ] Backup & restore data
- [ ] Chart/grafik analytics
- [ ] Customer review & rating

## 📞 Support

Untuk pertanyaan atau saran tentang website:

- **WhatsApp**: (0274) 555-1234
- **Alamat**: Jl. Merdeka No. 45, Bandung, Jawa Barat 40123

---

© 2026 DEWI TAILOR — Jahitan Presisi, Keanggunan yang Berbicara

Dibuat dengan ❤️ untuk profesionalisme dan kepercayaan pelanggan.
