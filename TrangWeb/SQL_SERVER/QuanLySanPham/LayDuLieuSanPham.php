<?php
$dbserver = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "lich_su_giao_dich_san_pham";

// Tạo kết nối đến cơ sở dữ liệu
$conn = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Truy vấn dữ liệu từ bảng san_pham
$sql = "SELECT * FROM san_pham";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $product = [
            "id" => $row["id"],
            "name" => $row["TenSanPham"],
            "image" => $row["HinhAnh"],
            "price" => $row["GiaTien"],
            "quantity" => $row["SoLuong"]
        ];
        array_push($products, $product);
    }
}

// Đóng kết nối đến cơ sở dữ liệu
$conn->close();

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($products);
?>
