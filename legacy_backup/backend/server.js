import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
const JWT_SECRET = "dewi-tailor-secret-key-2026";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files dari folder publik
app.use(express.static(path.join(__dirname, "..")));

// Database Setup
const dbPath = path.join(__dirname, "database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("✅ Connected to SQLite database");
    initializeDatabase();
  }
});

// Helper function untuk database queries
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

// Initialize Database Tables
async function initializeDatabase() {
  try {
    // Tabel Orders
    await dbRun(`
      CREATE TABLE IF NOT EXISTS orders (
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
      )
    `);

    // Tabel Gallery
    await dbRun(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        kategori TEXT NOT NULL,
        deskripsi TEXT NOT NULL,
        harga TEXT NOT NULL,
        image TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Admin
    await dbRun(`
      CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Cek apakah ada admin, jika tidak tambahkan default
    const adminExists = await dbGet("SELECT * FROM admin WHERE username = ?", [
      "dewi",
    ]);
    if (!adminExists) {
      await dbRun("INSERT INTO admin (username, password) VALUES (?, ?)", [
        "dewi",
        "dewi123",
      ]);
      console.log("✅ Default admin user created: dewi / dewi123");
    }

    // Seed initial gallery data
    const galleryCount = await dbGet("SELECT COUNT(*) as count FROM gallery");
    if (galleryCount.count === 0) {
      const galleryItems = [
        [
          "Kebaya Kutubaru Modern",
          "Kebaya",
          "Potongan ramping elegan dengan detail kerah kutubaru klasik. Cocok untuk wisuda, lamaran, dan pernikahan. Jahitan tangan pada detail bordir.",
          "Rp 250.000 – 400.000",
          "https://images.unsplash.com/photo-1608408669695-5fb165289e7a?w=400&h=500&fit=crop",
        ],
        [
          "Dress Pesta A-Line",
          "Dress Pesta",
          "Siluet A-line yang memanjangkan tubuh dengan detail pinggang manis. Cocok untuk pesta pernikahan, kondangan, dan acara formal.",
          "Rp 200.000 – 350.000",
          "https://images.unsplash.com/photo-1559631122-cc4ea2fed81d?w=400&h=500&fit=crop",
        ],
        [
          "Gamis Syar'i Elegan",
          "Gamis",
          "Potongan longgar namun tetap elegan dengan detail kancing depan dan lengan bishop. Nyaman untuk harian maupun kondangan.",
          "Rp 150.000 – 250.000",
          "https://images.unsplash.com/photo-1597202924378-e9b0f85dc773?w=400&h=500&fit=crop",
        ],
        [
          "Blouse Casual Modern",
          "Blouse",
          "Kerah V clean dengan detail plisket di bagian dada. Cocok untuk kerja maupun hangout. Tersedia pilihan lengan panjang dan pendek.",
          "Rp 80.000 – 130.000",
          "https://images.unsplash.com/photo-1546231690-4e1b9ff42d30?w=400&h=500&fit=crop",
        ],
        [
          "Rok Lipit Formal",
          "Rok",
          "Rok midi dengan detail lipit rapi, kesan profesional dan anggun. Sangat cocok untuk busana kerja dan acara semi-formal.",
          "Rp 90.000 – 130.000",
          "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop",
        ],
        [
          "Dress Pesta Anak",
          "Dress Anak",
          "Model princess dengan rok mengembang dan pita pinggang lebar. Tampilan mewah untuk ulang tahun, wisuda TK/SD, dan acara keluarga.",
          "Rp 100.000 – 180.000",
          "https://images.unsplash.com/photo-1587360349688-65f32e9b3e0e?w=400&h=500&fit=crop",
        ],
        [
          "Gamis Anak Syar'i",
          "Gamis Anak",
          "Gamis anak longgar dengan warna cerah. Nyaman dipakai beraktivitas dan tampil anggun untuk acara keagamaan.",
          "Rp 100.000 – 170.000",
          "https://images.unsplash.com/photo-1595587435533-0f12304f67e6?w=400&h=500&fit=crop",
        ],
        [
          "Jumpsuit Wanita",
          "Jumpsuit",
          "One-piece modern dengan potongan wide-leg yang trendi. Cocok untuk kasual hingga semi-formal, kesan chic & stylish.",
          "Rp 150.000 – 220.000",
          "https://images.unsplash.com/photo-1515207736741-69f00f2085bc?w=400&h=500&fit=crop",
        ],
        [
          "Rok Anak Flare",
          "Rok Anak",
          "Rok flare dengan lapisan inner dan detail renda di ujung. Aktif & nyaman untuk anak-anak.",
          "Rp 75.000 – 120.000",
          "https://images.unsplash.com/photo-1516762689617-e1cffff0e2e9?w=400&h=500&fit=crop",
        ],
      ];

      for (const item of galleryItems) {
        await dbRun(
          "INSERT INTO gallery (nama, kategori, deskripsi, harga, image) VALUES (?, ?, ?, ?, ?)",
          item,
        );
      }
      console.log("✅ Gallery items seeded");
    }

    // Seed initial order data jika kosong
    const orderCount = await dbGet("SELECT COUNT(*) as count FROM orders");
    if (orderCount.count === 0) {
      const sampleOrders = [
        [
          "2601",
          "Siti Rahma",
          "081234567890",
          "Dress Pesta",
          "Dress A-line warna rose gold",
          "",
          1,
          "2026-04-15",
          "2026-04-25",
          "Dikerjakan",
          350000,
          "Tunai",
          "Belum",
          "",
        ],
        [
          "2602",
          "Dwi Ningsih",
          "082345678901",
          "Gamis Syar'i",
          "Gamis syar'i warna navy biru",
          "",
          1,
          "2026-04-16",
          "2026-04-28",
          "Menunggu",
          200000,
          "Transfer",
          "Belum",
          "",
        ],
        [
          "2603",
          "Sinta Kusuma",
          "083456789012",
          "Kebaya Kutubaru",
          "Kebaya dengan bordir tangan",
          "",
          1,
          "2026-04-10",
          "2026-04-22",
          "Selesai",
          400000,
          "Tunai",
          "Lunas",
          "Sudah siap diambil",
        ],
      ];

      for (const order of sampleOrders) {
        await dbRun(
          "INSERT INTO orders (noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, estimasiSelesai, status, harga, metode, bayar, catatan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          order,
        );
      }
      console.log("✅ Sample orders seeded");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// ============ AUTH ENDPOINTS ============

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await dbGet("SELECT * FROM admin WHERE username = ?", [
      username,
    ]);
    if (!admin) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      success: true,
      token,
      user: { id: admin.id, username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ============ ORDERS ENDPOINTS ============

// GET all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await dbAll("SELECT * FROM orders ORDER BY noAntrian DESC");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single order by ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await dbGet("SELECT * FROM orders WHERE id = ?", [
      req.params.id,
    ]);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search order by name
app.get("/api/orders/search/:nama", async (req, res) => {
  try {
    const order = await dbGet("SELECT * FROM orders WHERE nama = ?", [
      req.params.nama,
    ]);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create order (from pre-order form)
app.post("/api/orders", async (req, res) => {
  try {
    const {
      nama,
      noHp,
      jenis,
      deskripsi,
      keterangan,
      jumlah,
      tanggalFitting,
      metode,
    } = req.body;

    // Generate nomor antrian
    const lastOrder = await dbGet(
      "SELECT noAntrian FROM orders ORDER BY CAST(noAntrian AS INTEGER) DESC LIMIT 1",
    );
    let noAntrian;
    if (lastOrder) {
      noAntrian = String(parseInt(lastOrder.noAntrian) + 1).padStart(4, "0");
    } else {
      noAntrian = "2601";
    }

    const tglMasuk = new Date().toISOString().split("T")[0];

    await dbRun(
      "INSERT INTO orders (noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, metode, status, bayar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        noAntrian,
        nama,
        noHp,
        jenis,
        deskripsi,
        keterangan || "",
        jumlah,
        tglMasuk,
        metode,
        "Menunggu",
        "Belum",
      ],
    );

    res.json({
      success: true,
      noAntrian,
      message: "Pre-order berhasil! Nomor antrian Anda sudah terdaftar.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update order (admin only)
app.put("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    const { status, estimasiSelesai, harga, metode, bayar, catatan } = req.body;
    const id = req.params.id;

    await dbRun(
      "UPDATE orders SET status = ?, estimasiSelesai = ?, harga = ?, metode = ?, bayar = ?, catatan = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
      [status, estimasiSelesai, harga, metode, bayar, catatan, id],
    );

    res.json({ success: true, message: "Order updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE order (admin only)
app.delete("/api/orders/:id", verifyToken, async (req, res) => {
  try {
    await dbRun("DELETE FROM orders WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ GALLERY ENDPOINTS ============

// GET all gallery items
app.get("/api/gallery", async (req, res) => {
  try {
    const items = await dbAll("SELECT * FROM gallery ORDER BY id DESC");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add gallery item (admin only)
app.post("/api/gallery", verifyToken, async (req, res) => {
  try {
    const { nama, kategori, deskripsi, harga, image } = req.body;

    await dbRun(
      "INSERT INTO gallery (nama, kategori, deskripsi, harga, image) VALUES (?, ?, ?, ?, ?)",
      [nama, kategori, deskripsi, harga, image],
    );

    res.json({ success: true, message: "Gallery item added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE gallery item (admin only)
app.delete("/api/gallery/:id", verifyToken, async (req, res) => {
  try {
    await dbRun("DELETE FROM gallery WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ STATS ENDPOINT ============

// GET dashboard stats (admin only)
app.get("/api/stats", verifyToken, async (req, res) => {
  try {
    const orders = await dbAll("SELECT * FROM orders");
    const today = new Date().toISOString().split("T")[0];
    const today_d = new Date(today);

    const totalAktif = orders.filter(
      (o) => o.status !== "Selesai" || o.bayar !== "Lunas",
    ).length;

    const selesaiHariIni = orders.filter((o) => {
      const tglMasuk = o.tglMasuk || today;
      return o.status === "Selesai" && tglMasuk === today;
    }).length;

    const deadlineDekat = orders.filter((o) => {
      if (!o.estimasiSelesai || o.status === "Selesai") return false;
      const estimate = new Date(o.estimasiSelesai);
      const daysLeft = Math.ceil((estimate - today_d) / (1000 * 60 * 60 * 24));
      return daysLeft > 0 && daysLeft <= 2;
    }).length;

    const belumEstimasi = orders.filter(
      (o) => !o.estimasiSelesai && o.status !== "Selesai",
    ).length;

    res.json({
      orders,
      totalAktif,
      selesaiHariIni,
      deadlineDekat,
      belumEstimasi,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, "..")}`);
});
