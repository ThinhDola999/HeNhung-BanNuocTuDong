<?php
// Kết nối đến cơ sở dữ liệu
$dbserver = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "lich_su_giao_dich_san_pham";


$conn = new mysqli($dbserver, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Truy vấn SQL để lấy dữ liệu
$sql = "SELECT MONTH(ThoiGian) AS thang, SUM(TongTien) AS doanh_thu
FROM lich_su_giao_dich
GROUP BY YEAR(ThoiGian), MONTH(ThoiGian)
ORDER BY YEAR(ThoiGian), MONTH(ThoiGian);";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Đóng kết nối cơ sở dữ liệu
$conn->close();

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($data);
?>