<?php
// Kết nối đến cơ sở dữ liệu (sử dụng thông tin kết nối thực của bạn)
$dbserver = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "lich_su_giao_dich_san_pham";

// Tạo kết nối đến cơ sở dữ liệu
$conn = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

// Lấy dữ liệu được gửi từ JavaScript
$id = $_POST['id'];
$name = $_POST['name'];
$price = $_POST['price'];
$quantity = $_POST['quantity'];
$img = $_POST['img'];

// Cập nhật dữ liệu trong cơ sở dữ liệu
$sql = "INSERT INTO san_pham (id, TenSanPham, HinhAnh, GiaTien, SoLuong)
       VALUES('$id', '$name', '$img', '$price', '$quantity')";

if ($conn->query($sql) === TRUE) {
    echo "thêm sản phẩm thành công";
} else {
    echo "Lỗi khi thêm sản phẩm: " . $conn->error;
}

// Đóng kết nối đến cơ sở dữ liệu
$conn->close();
?>
