 HEAD
# aplikasi-kasir

# Aplikasi Kasir Sederhana 🛒

Aplikasi web kasir (Point of Sale) yang simple dan user-friendly untuk mengelola transaksi penjualan.

## Fitur

✅ **Tambah Produk**
- Input nama produk, harga, dan jumlah
- Validasi input yang lengkap

✅ **Manajemen Keranjang**
- Tampilan daftar produk yang jelas
- Tombol edit untuk mengubah data produk
- Tombol hapus untuk menghapus produk
- Perhitungan subtotal otomatis untuk setiap item

✅ **Ringkasan Transaksi**
- Total item (jumlah produk)
- Subtotal
- Perhitungan diskon (dalam %)
- Total yang harus dibayar
- Input jumlah pembayaran
- Perhitungan kembalian otomatis

✅ **Proses Pembayaran**
- Validasi pembayaran sebelum diproses
- Notifikasi detail transaksi
- Reset otomatis setelah pembayaran berhasil

✅ **User Interface**
- Design modern dan responsif
- Kompatibel dengan desktop dan mobile
- Animasi yang smooth
- Notifikasi modal yang user-friendly

## Struktur File

```
aplikasi-kasir/
├── index.html    # Struktur HTML
├── style.css     # Styling dan responsive design
├── script.js     # Logika aplikasi
└── README.md     # Dokumentasi
```

## Cara Menggunakan

1. Buka file `index.html` di browser
2. Isi form dengan data produk (nama, harga, jumlah)
3. Klik tombol "Tambah ke Keranjang"
4. Ulangi langkah 2-3 untuk produk lainnya
5. Atur diskon jika diperlukan (dalam %)
6. Input jumlah pembayaran
7. Klik "Proses Pembayaran"
8. Gunakan "Reset Transaksi" untuk memulai transaksi baru

## Fitur Edit & Hapus

- **Edit**: Klik tombol "Edit" pada produk yang ingin diubah. Data akan terisi di form input.
- **Hapus**: Klik tombol "Hapus" untuk menghapus produk dari keranjang.

## Catatan

Saat ini, aplikasi ini menggunakan penyimpanan data di memori (tidak persisten). 
Untuk integrasi database, Anda dapat:
- Menambahkan backend API (Node.js, PHP, Django, dll)
- Menghubungkan dengan database (MySQL, PostgreSQL, MongoDB, dll)
- Mengimplementasikan fitur login dan manajemen data yang lebih kompleks

## Browser Support

✓ Chrome
✓ Firefox
✓ Safari
✓ Edge
✓ Mobile browsers

## License

Bebas digunakan dan dimodifikasi sesuai kebutuhan Anda.
61742cb (Simpan README lokal sebelum merge)
