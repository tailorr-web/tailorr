CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        noAntrian TEXT UNIQUE NOT NULL,
        nama TEXT NOT NULL,
        noHp TEXT NOT NULL,
        jenis TEXT NOT NULL,
        deskripsi TEXT NOT NULL,
        keterangan TEXT,
        jumlah INTEGER DEFAULT 1,
        tglMasuk TEXT NOT NULL,
        estimasiSelesai TEXT,
        status TEXT DEFAULT 'Menunggu',
        harga INTEGER DEFAULT 0,
        metode TEXT,
        bayar TEXT DEFAULT 'Belum',
        catatan TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO orders (id, noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, estimasiSelesai, status, harga, metode, bayar, catatan, createdAt, updatedAt) VALUES (1, '2601', 'Siti Rahma', '081234567890', 'Dress Pesta', 'Dress A-line warna rose gold', '', 1, '2026-04-15', '2026-04-25', 'Dikerjakan', 350000, 'Tunai', 'Belum', '', '2026-04-20 14:18:31', '2026-04-20 14:18:31');
INSERT INTO orders (id, noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, estimasiSelesai, status, harga, metode, bayar, catatan, createdAt, updatedAt) VALUES (2, '2602', 'Dwi Ningsih', '082345678901', 'Gamis Syar''i', 'Gamis syar''i warna navy biru', '', 1, '2026-04-16', '2026-04-28', 'Menunggu', 200000, 'Transfer', 'Belum', '', '2026-04-20 14:18:31', '2026-04-20 14:18:31');
INSERT INTO orders (id, noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, estimasiSelesai, status, harga, metode, bayar, catatan, createdAt, updatedAt) VALUES (3, '2603', 'Sinta Kusuma', '083456789012', 'Kebaya Kutubaru', 'Kebaya dengan bordir tangan', '', 1, '2026-04-10', '2026-04-22', 'Selesai', 400000, 'Tunai', 'Lunas', 'Sudah siap diambil', '2026-04-20 14:18:31', '2026-04-20 14:18:31');

CREATE TABLE gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        kategori TEXT NOT NULL,
        deskripsi TEXT NOT NULL,
        harga TEXT NOT NULL,
        image TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (1, 'Kebaya Kutubaru Modern', 'Kebaya', 'Potongan ramping elegan dengan detail kerah kutubaru klasik. Cocok untuk wisuda, lamaran, dan pernikahan. Jahitan tangan pada detail bordir.', 'Rp 250.000 – 400.000', 'https://images.unsplash.com/photo-1608408669695-5fb165289e7a?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (2, 'Dress Pesta A-Line', 'Dress Pesta', 'Siluet A-line yang memanjangkan tubuh dengan detail pinggang manis. Cocok untuk pesta pernikahan, kondangan, dan acara formal.', 'Rp 200.000 – 350.000', 'https://images.unsplash.com/photo-1559631122-cc4ea2fed81d?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (3, 'Gamis Syar''i Elegan', 'Gamis', 'Potongan longgar namun tetap elegan dengan detail kancing depan dan lengan bishop. Nyaman untuk harian maupun kondangan.', 'Rp 150.000 – 250.000', 'https://images.unsplash.com/photo-1597202924378-e9b0f85dc773?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (4, 'Blouse Casual Modern', 'Blouse', 'Kerah V clean dengan detail plisket di bagian dada. Cocok untuk kerja maupun hangout. Tersedia pilihan lengan panjang dan pendek.', 'Rp 80.000 – 130.000', 'https://images.unsplash.com/photo-1546231690-4e1b9ff42d30?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (5, 'Rok Lipit Formal', 'Rok', 'Rok midi dengan detail lipit rapi, kesan profesional dan anggun. Sangat cocok untuk busana kerja dan acara semi-formal.', 'Rp 90.000 – 130.000', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (6, 'Dress Pesta Anak', 'Dress Anak', 'Model princess dengan rok mengembang dan pita pinggang lebar. Tampilan mewah untuk ulang tahun, wisuda TK/SD, dan acara keluarga.', 'Rp 100.000 – 180.000', 'https://images.unsplash.com/photo-1587360349688-65f32e9b3e0e?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (7, 'Gamis Anak Syar''i', 'Gamis Anak', 'Gamis anak longgar dengan warna cerah. Nyaman dipakai beraktivitas dan tampil anggun untuk acara keagamaan.', 'Rp 100.000 – 170.000', 'https://images.unsplash.com/photo-1595587435533-0f12304f67e6?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (8, 'Jumpsuit Wanita', 'Jumpsuit', 'One-piece modern dengan potongan wide-leg yang trendi. Cocok untuk kasual hingga semi-formal, kesan chic & stylish.', 'Rp 150.000 – 220.000', 'https://images.unsplash.com/photo-1515207736741-69f00f2085bc?w=400&h=500&fit=crop', '2026-04-20 14:18:31');
INSERT INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (9, 'Rok Anak Flare', 'Rok Anak', 'Rok flare dengan lapisan inner dan detail renda di ujung. Aktif & nyaman untuk anak-anak.', 'Rp 75.000 – 120.000', 'https://images.unsplash.com/photo-1516762689617-e1cffff0e2e9?w=400&h=500&fit=crop', '2026-04-20 14:18:31');

CREATE TABLE admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
INSERT INTO admin (id, username, password, createdAt) VALUES (1, 'dewi', 'dewi123', '2026-04-20 14:18:31');

