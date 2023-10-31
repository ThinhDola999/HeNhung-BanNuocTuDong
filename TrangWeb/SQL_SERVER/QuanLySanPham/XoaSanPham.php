<?php
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

// Lấy ID sản phẩm từ dữ liệu POST (gửi từ AJAX)
if (isset($_POST["id"])) {
    $productId = $_POST["id"];

    // Xóa sản phẩm từ cơ sở dữ liệu
    $sql = "DELETE FROM san_pham WHERE id = $productId";

    if ($conn->query($sql) === TRUE) {
        // Xóa thành công
        echo "Xóa sản phẩm thành công";
    } else {
        // Xóa thất bại
        echo "Lỗi khi xóa sản phẩm: " . $conn->error;
    }
} else {
    // Không có ID sản phẩm được gửi
    echo "Không có ID sản phẩm được gửi";
}

// Đóng kết nối đến cơ sở dữ liệu
$conn->close();
?>
