'use server';

import db from '@/../lib/db';
import { revalidatePath } from 'next/cache';
import { signToken } from '@/../lib/auth';

export async function createOrder(formData) {
  try {
    const { nama, noHp, jenis, deskripsi, keterangan, jumlah, tanggalFitting, metode } = formData;

    // Generate nomor antrian
    const lastOrderResult = await db.execute('SELECT noAntrian FROM orders ORDER BY CAST(noAntrian AS INTEGER) DESC LIMIT 1');
    const lastOrder = lastOrderResult.rows[0];
    
    let noAntrian;
    if (lastOrder) {
      noAntrian = String(parseInt(lastOrder.noAntrian) + 1).padStart(4, '0');
    } else {
      noAntrian = '2601';
    }

    const tglMasuk = new Date().toISOString().split('T')[0];

    await db.execute({
      sql: `INSERT INTO orders (noAntrian, nama, noHp, jenis, deskripsi, keterangan, jumlah, tglMasuk, metode, status, bayar) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        noAntrian,
        nama,
        noHp,
        jenis,
        deskripsi,
        keterangan || '',
        jumlah,
        tglMasuk,
        metode,
        'Menunggu',
        'Belum'
      ]
    });

    revalidatePath('/antrian');
    revalidatePath('/admin');

    return {
      success: true,
      noAntrian,
      message: 'Pre-order berhasil! Nomor antrian Anda sudah terdaftar.',
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: error.message };
  }
}

export async function searchOrderByName(nama) {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM orders WHERE LOWER(nama) = LOWER(?)',
      args: [nama]
    });
    const order = result.rows[0];
    
    if (!order) return { success: false, error: 'Pesanan tidak ditemukan' };
    
    // Hitung posisi antrian
    const allResult = await db.execute('SELECT noAntrian, status, bayar FROM orders ORDER BY noAntrian ASC');
    const allOrders = allResult.rows;
    const activeOrders = allOrders.filter(o => o.status !== 'Selesai' || o.bayar !== 'Lunas');
    const position = activeOrders.findIndex(o => o.noAntrian === order.noAntrian) + 1;
    
    return { success: true, order, position, totalActive: activeOrders.length };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getStats() {
  try {
    const result = await db.execute('SELECT * FROM orders');
    const orders = result.rows;
    const today = new Date().toISOString().split('T')[0];

    const totalAktif = orders.filter(o => o.status !== 'Selesai' || o.bayar !== 'Lunas').length;
    const selesaiHariIni = orders.filter(o => o.status === 'Selesai' && o.updatedAt?.startsWith(today)).length;
    
    return {
      totalOrders: orders.length,
      totalAktif,
      selesaiHariIni
    };
  } catch (error) {
    return { error: error.message };
  }
}

export async function login(username, password) {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM admin WHERE username = ?',
      args: [username]
    });
    const admin = result.rows[0];

    if (!admin || admin.password !== password) {
      return { success: false, error: 'Username atau password salah' };
    }
    const token = signToken({ id: admin.id, username: admin.username });
    return { success: true, token, user: { id: admin.id, username: admin.username } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateOrder(id, data) {
  try {
    const { status, estimasiSelesai, harga, metode, bayar, catatan } = data;
    await db.execute({
      sql: `UPDATE orders 
            SET status = ?, estimasiSelesai = ?, harga = ?, metode = ?, bayar = ?, catatan = ?, updatedAt = CURRENT_TIMESTAMP 
            WHERE id = ?`,
      args: [status, estimasiSelesai, harga, metode, bayar, catatan, id]
    });
    
    revalidatePath('/admin');
    revalidatePath('/antrian');
    revalidatePath('/cek-status');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteOrder(id) {
  try {
    await db.execute({
      sql: 'DELETE FROM orders WHERE id = ?',
      args: [id]
    });
    revalidatePath('/admin');
    revalidatePath('/antrian');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addGalleryItem(data) {
  try {
    const { nama, kategori, deskripsi, harga, image } = data;
    await db.execute({
      sql: 'INSERT INTO gallery (nama, kategori, deskripsi, harga, image) VALUES (?, ?, ?, ?, ?)',
      args: [nama, kategori, deskripsi, harga, image]
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryItem(id) {
  try {
    await db.execute({
      sql: 'DELETE FROM gallery WHERE id = ?',
      args: [id]
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllOrders() {
  try {
    const result = await db.execute('SELECT * FROM orders ORDER BY noAntrian DESC');
    return { success: true, orders: result.rows };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllGallery() {
  try {
    const result = await db.execute('SELECT * FROM gallery ORDER BY id DESC');
    return { success: true, gallery: result.rows };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
