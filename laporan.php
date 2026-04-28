<?php
include 'koneksi.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Riwayat Transaksi</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .table-container { padding: 20px; background: white; border-radius: 10px; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #764ba2; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📋 Riwayat Penjualan</h1>
            <a href="index.php" style="color: white; text-decoration: none;">[ Kembali ke Kasir ]</a>
        </header>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Waktu</th>
                        <th>Total Item</th>
                        <th>Total Bayar</th>
                        <th>Jumlah Uang</th>
                        <th>Kembalian</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql = "SELECT * FROM penjualan ORDER BY tanggal_waktu DESC";
                    $result = mysqli_query($conn, $sql);
                    
                    if (mysqli_num_rows($result) > 0) {
                        while($row = mysqli_fetch_assoc($result)) {
                            echo "<tr>
                                    <td>{$row['id_penjualan']}</td>
                                    <td>{$row['tanggal_waktu']}</td>
                                    <td>{$row['total_item']}</td>
                                    <td>Rp " . number_format($row['total_bayar']) . "</td>
                                    <td>Rp " . number_format($row['jumlah_bayar']) . "</td>
                                    <td>Rp " . number_format($row['kembalian']) . "</td>
                                  </tr>";
                        }
                    } else {
                        echo "<tr><td colspan='6' style='text-align:center;'>Belum ada transaksi</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>