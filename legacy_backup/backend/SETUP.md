# DEWI TAILOR Backend - Setup & Running Guide

## 📋 Prasyarat

- **Node.js** (versi 14 atau lebih baru)
- **npm** (biasanya terinstall bersamaan dengan Node.js)

## 🚀 Instalasi & Setup

### 1. Instal Dependencies

```bash
cd backend
npm install
```

Ini akan menginstall:

- `express` - Web framework
- `sqlite3` - Database
- `cors` - Cross-origin requests
- `body-parser` - Parse JSON request bodies
- `jsonwebtoken` - JWT authentication

### 2. Jalankan Server

```bash
npm start
```

atau dengan auto-reload saat development:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

Output yang diharapkan:

```
✅ Connected to SQLite database
✅ Default admin user created: dewi / dewi123
✅ Gallery items seeded
✅ Sample orders seeded
🚀 Server running at http://localhost:3000
```

## 📁 Database

Database SQLite otomatis dibuat di `backend/database.db` dengan struktur:

### Tabel `orders`

- `id` - Primary key
- `noAntrian` - Nomor antrian unik
- `nama` - Nama pelanggan
- `noHp` - Nomor HP
- `jenis` - Jenis pakaian
- `deskripsi` - Deskripsi model
- `keterangan` - Keterangan tambahan
- `jumlah` - Jumlah pakaian
- `tglMasuk` - Tanggal order masuk
- `estimasiSelesai` - Estimasi tanggal selesai
- `status` - Status order (Menunggu/Dikerjakan/Fitting/Selesai)
- `harga` - Harga jahitan
- `metode` - Metode pembayaran (Tunai/Transfer/QRIS)
- `bayar` - Status pembayaran (Belum/Lunas)
- `catatan` - Catatan dari penjahit
- `createdAt`, `updatedAt` - Timestamp

### Tabel `gallery`

- `id` - Primary key
- `nama` - Nama model pakaian
- `kategori` - Kategori pakaian
- `deskripsi` - Deskripsi lengkap
- `harga` - Estimasi harga
- `image` - URL foto
- `createdAt` - Timestamp

### Tabel `admin`

- `id` - Primary key
- `username` - Username login
- `password` - Password (plaintext untuk demo, gunakan bcrypt di production!)
- `createdAt` - Timestamp

## 🔑 Default Credentials

```
Username: dewi
Password: dewi123
```

⚠️ **IMPORTANT**: Ganti password ini di production! Edit `backend/server.js` baris yang insert admin user.

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login` - Login admin

### Orders

- `GET /api/orders` - Get semua orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/search/:nama` - Cari order by nama
- `POST /api/orders` - Create order (pre-order form)
- `PUT /api/orders/:id` - Update order (admin, memerlukan token)
- `DELETE /api/orders/:id` - Delete order (admin, memerlukan token)

### Gallery

- `GET /api/gallery` - Get semua item galeri
- `POST /api/gallery` - Tambah item galeri (admin, memerlukan token)
- `DELETE /api/gallery/:id` - Hapus item galeri (admin, memerlukan token)

### Stats

- `GET /api/stats` - Get dashboard stats (admin, memerlukan token)

## 🔐 Authentication

Token JWT dikirim saat login dan harus disertakan di header setiap request admin:

```
Authorization: Bearer <token>
```

Token expires dalam 7 hari.

## 💡 Contoh Requests

### Pre-Order (POST /api/orders)

```json
{
  "nama": "Siti Rahma",
  "noHp": "081234567890",
  "jenis": "Dress Pesta",
  "deskripsi": "Dress A-line warna rose gold",
  "keterangan": "dengan detail bordir tangan",
  "jumlah": 1,
  "tanggalFitting": "2026-04-25",
  "metode": "Tunai"
}
```

### Login (POST /api/auth/login)

```json
{
  "username": "dewi",
  "password": "dewi123"
}
```

Response:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "dewi"
  }
}
```

### Update Order (PUT /api/orders/1)

Header:

```
Authorization: Bearer <token>
```

Body:

```json
{
  "status": "Dikerjakan",
  "estimasiSelesai": "2026-04-25",
  "harga": 350000,
  "metode": "Tunai",
  "bayar": "Belum",
  "catatan": "Sedang proses, ada pertanyaan hubungi WA"
}
```

## 🛠️ Troubleshooting

### Port 3000 sudah dipakai

```bash
# Ubah PORT di server.js atau kill process yang pakai port 3000
lsof -i :3000
kill -9 <PID>
```

### Module not found errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database corruption

```bash
# Delete database dan jalankan ulang
rm backend/database.db
npm start
```

## 📦 Production Deployment

Untuk production:

1. **Ganti password admin** - Edit `backend/server.js`
2. **Hash passwords** - Gunakan `bcryptjs` untuk hash password
3. **Gunakan environment variables** - Simpan secrets di `.env` file
4. **Use PostgreSQL atau MySQL** - SQLite untuk development saja
5. **Enable HTTPS** - Deploy dengan SSL certificate
6. **Rate limiting** - Tambahkan middleware rate limiting
7. **Validation** - Tambahkan lebih banyak input validation

Contoh `.env`:

```
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:pass@host/db
```

## 📞 Support

Jika ada masalah, cek:

- Console output apakah ada error?
- Database file `backend/database.db` exists?
- Port 3000 available?
- Node.js terinstall dengan benar?

---

© 2026 DEWI TAILOR
