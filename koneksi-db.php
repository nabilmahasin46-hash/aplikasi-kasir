<?php
$host = "localhost";
$user = "root";
$pass = ""; // Di XAMPP biasanya kosong
$db   = "db_kasir"; // Pastikan nama database di phpMyAdmin sama

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Koneksi ke database gagal: " . mysqli_connect_error());
}
?>