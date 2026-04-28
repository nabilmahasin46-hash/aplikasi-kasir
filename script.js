// Data Produk
let daftarItem = [];
let nomorItem = 0;

// DOM Elements
const formProduk = document.getElementById('formProduk');
const namaProdukInput = document.getElementById('namaProduk');
const hargaProdukInput = document.getElementById('hargaProduk');
const jumlahProdukInput = document.getElementById('jumlahProduk');
const daftarProdukDiv = document.getElementById('daftarProduk');
const totalItemSpan = document.getElementById('totalItem');
const subtotalSpan = document.getElementById('subtotal');
const diskonInput = document.getElementById('diskon');
const nilaiDiskonSpan = document.getElementById('nilaiDiskon');
const totalBayarSpan = document.getElementById('totalBayar');
const jumlahBayarInput = document.getElementById('jumlahBayar');
const kembalianSpan = document.getElementById('kembalian');
const btnProses = document.getElementById('btnProses');
const btnReset = document.getElementById('btnReset');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');
const closeModal = document.querySelector('.close');

// Event Listeners
formProduk.addEventListener('submit', tambahProduk);
diskonInput.addEventListener('change', hitungTotal);
jumlahBayarInput.addEventListener('input', hitungKembalian);
btnProses.addEventListener('click', prosesPembayaran);
btnReset.addEventListener('click', resetTransaksi);
closeModal.addEventListener('click', tutupModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) tutupModal();
});

// Fungsi Tambah Produk
function tambahProduk(e) {
    e.preventDefault();

    const nama = namaProdukInput.value.trim();
    const harga = parseInt(hargaProdukInput.value);
    const jumlah = parseInt(jumlahProdukInput.value);

    if (!nama || harga <= 0 || jumlah <= 0) {
        showModal('Error', 'Mohon isi semua kolom dengan benar!');
        return;
    }

    nomorItem++;
    const item = {
        id: nomorItem,
        nama: nama,
        harga: harga,
        jumlah: jumlah,
        subtotal: harga * jumlah
    };

    daftarItem.push(item);
    tampilkanProduk();
    hitungTotal();
    resetForm();
}

// Fungsi Tampilkan Produk
function tampilkanProduk() {
    if (daftarItem.length === 0) {
        daftarProdukDiv.innerHTML = '<p class="empty-message">Keranjang kosong. Tambahkan produk terlebih dahulu.</p>';
        return;
    }

    daftarProdukDiv.innerHTML = '';
    daftarItem.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <div class="product-info">
                <div class="product-name">${item.nama}</div>
                <div class="product-details">
                    <div>Harga: Rp ${formatRupiah(item.harga)}</div>
                    <div>Jumlah: ${item.jumlah} pcs</div>
                </div>
                <div class="product-total">Total: Rp ${formatRupiah(item.subtotal)}</div>
            </div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduk(${item.id})">Edit</button>
                <button class="btn-delete" onclick="hapusProduk(${item.id})">Hapus</button>
            </div>
        `;
        daftarProdukDiv.appendChild(productElement);
    });
}

// Fungsi Edit Produk
function editProduk(id) {
    const item = daftarItem.find(i => i.id === id);
    if (!item) return;

    namaProdukInput.value = item.nama;
    hargaProdukInput.value = item.harga;
    jumlahProdukInput.value = item.jumlah;

    hapusProduk(id);
    namaProdukInput.focus();
}

// Fungsi Hapus Produk
function hapusProduk(id) {
    daftarItem = daftarItem.filter(item => item.id !== id);
    tampilkanProduk();
    hitungTotal();
}

// Fungsi Hitung Total
function hitungTotal() {
    if (daftarItem.length === 0) {
        totalItemSpan.textContent = '0';
        subtotalSpan.textContent = 'Rp 0';
        nilaiDiskonSpan.textContent = 'Rp 0';
        totalBayarSpan.textContent = 'Rp 0';
        kembalianSpan.textContent = 'Rp 0';
        return;
    }

    // Hitung total item dan subtotal
    let totalItem = 0;
    let subtotal = 0;

    daftarItem.forEach(item => {
        totalItem += item.jumlah;
        subtotal += item.subtotal;
    });

    totalItemSpan.textContent = totalItem;
    subtotalSpan.textContent = 'Rp ' + formatRupiah(subtotal);

    // Hitung diskon
    const diskonPersen = parseInt(diskonInput.value) || 0;
    const nilaiDiskon = Math.floor((subtotal * diskonPersen) / 100);
    nilaiDiskonSpan.textContent = 'Rp ' + formatRupiah(nilaiDiskon);

    // Hitung total bayar
    const totalBayar = subtotal - nilaiDiskon;
    totalBayarSpan.textContent = 'Rp ' + formatRupiah(totalBayar);

    // Hitung kembalian jika ada
    hitungKembalian();
}

// Fungsi Hitung Kembalian
function hitungKembalian() {
    const totalBayarText = totalBayarSpan.textContent.replace('Rp ', '').replace(/\./g, '');
    const totalBayar = parseInt(totalBayarText) || 0;
    const jumlahBayar = parseInt(jumlahBayarInput.value) || 0;
    const kembalian = jumlahBayar - totalBayar;

    if (kembalian < 0) {
        kembalianSpan.textContent = 'Rp 0 - Kurang Rp ' + formatRupiah(Math.abs(kembalian));
        kembalianSpan.style.color = '#f56565';
    } else {
        kembalianSpan.textContent = 'Rp ' + formatRupiah(kembalian);
        kembalianSpan.style.color = '#48bb78';
    }
}

// Fungsi Proses Pembayaran
function prosesPembayaran() {
    const jumlahBayar = parseInt(jumlahBayarInput.value);
    const totalBayar = parseInt(totalBayarSpan.textContent.replace(/\D/g, ''));

    if (daftarItem.length === 0) {
        showModal('Error', 'Keranjang masih kosong!');
        return;
    }

    if (!jumlahBayar || jumlahBayar < totalBayar) {
        showModal('Error', 'Jumlah pembayaran tidak cukup!');
        return;
    }

    // DATA YANG AKAN DIKIRIM KE DATABASE
    const dataKirim = {
        total_item: daftarItem.length,
        total_bayar: totalBayar,
        bayar: jumlahBayar,
        kembalian: jumlahBayar - totalBayar
    };

    // KIRIM KE PHP
    fetch('simpan_transaksi.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataKirim)
    })
    .then(res => res.json())
    .then(hasil => {
        if(hasil.status === 'success') {
            showModal('Berhasil!', 'Transaksi telah disimpan ke database.');
            resetTransaksi();
        } else {
            showModal('Gagal', 'Terjadi kesalahan sistem.');
        }
    });
}

// Fungsi Reset Transaksi
function resetTransaksi() {
    daftarItem = [];
    nomorItem = 0;
    resetForm();
    tampilkanProduk();
    hitungTotal();
    jumlahBayarInput.value = '';
    diskonInput.value = '0';
}

// Fungsi Reset Form
function resetForm() {
    formProduk.reset();
    jumlahProdukInput.value = '1';
    namaProdukInput.focus();
}

// Fungsi Format Rupiah
function formatRupiah(nilai) {
    return nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Fungsi Show Modal
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Fungsi Tutup Modal
function tutupModal() {
    modal.style.display = 'none';
}

// Close modal when button is clicked
modalBtn.addEventListener('click', tutupModal);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    tampilkanProduk();
    hitungTotal();
});
