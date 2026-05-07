const { createClient } = require('@libsql/client');
const Database = require('better-sqlite3');

/**
 * PETUNJUK:
 * 1. Masukkan URL & Token Turso Anda di bawah ini.
 * 2. Simpan file ini (Ctrl + S).
 * 3. Jalankan perintah 'node sync_turso.js' di terminal.
 */
const TURSO_URL = "libsql://dewi-tailor-tailorr-web.aws-ap-northeast-1.turso.io";
const TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzgxNDk3MDIsImlkIjoiMDE5ZTAxYzgtYmMwMS03Yjc5LWE5ZGEtMjNiY2MxOGYzYTQ1IiwicmlkIjoiNzFhM2FkYzQtMGZlOS00NTI2LTk0MDEtZmJlOGQ3NjU1MGZhIn0.ggez1Xl9xpHI9MnE1017eshJY3EGS33TgXAnmaCru6nK2bSz8VVErvqGladXVnEaUM6RM2WiVCMOWS7wNsLAAA";

async function sync() {
    if (TURSO_URL.includes("MASUKKAN")) {
        console.error("❌ ERROR: Anda belum memasukkan URL Turso yang benar!");
        return;
    }

    console.log("🚀 Memulai proses sinkronisasi ke Turso...");
    
    const localDb = new Database('database.db');
    const remoteDb = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });

    try {
        // Buat Tabel di Turso
        console.log("📦 Membuat tabel di cloud...");
        await remoteDb.execute(`CREATE TABLE IF NOT EXISTS orders (
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
        )`);
        
        await remoteDb.execute(`CREATE TABLE IF NOT EXISTS gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT NOT NULL,
            kategori TEXT NOT NULL,
            deskripsi TEXT NOT NULL,
            harga TEXT NOT NULL,
            image TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        
        await remoteDb.execute(`CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Pindahkan data Admin
        console.log("👤 Memindahkan data admin...");
        const admins = localDb.prepare("SELECT * FROM admin").all();
        for (const a of admins) {
            await remoteDb.execute({ 
                sql: "INSERT OR IGNORE INTO admin (id, username, password, createdAt) VALUES (?, ?, ?, ?)", 
                args: [a.id, a.username, a.password, a.createdAt] 
            });
        }

        // Pindahkan data Galeri
        console.log("🖼️ Memindahkan data galeri...");
        const gallery = localDb.prepare("SELECT * FROM gallery").all();
        for (const g of gallery) {
            await remoteDb.execute({ 
                sql: "INSERT OR IGNORE INTO gallery (id, nama, kategori, deskripsi, harga, image, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                args: [g.id, g.nama, g.kategori, g.deskripsi, g.harga, g.image, g.createdAt] 
            });
        }

        // Pindahkan data Orders
        console.log("📝 Memindahkan data pesanan...");
        const orders = localDb.prepare("SELECT * FROM orders").all();
        for (const o of orders) {
            await remoteDb.execute({ 
                sql: "INSERT OR IGNORE INTO orders (id, noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, estimasiSelesai, status, harga, metode, bayar, catatan, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                args: [o.id, o.noAntrian, o.nama, o.noHp, o.jenis, o.deskripsi, o.keterangan, o.jumlah, o.tglMasuk, o.estimasiSelesai, o.status, o.harga, o.metode, o.bayar, o.catatan, o.createdAt, o.updatedAt] 
            });
        }

        console.log("✅ BERHASIL! Semua data sudah di Cloud.");
        console.log("Silakan buka kembali website Vercel Anda dan coba fitur-fiturnya.");

    } catch (error) {
        console.error("❌ Terjadi Kesalahan:", error);
    }
}

sync();
