
<?php


$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

if (isset($_GET['soLuongDanhSach'])) {
    $soLuongDanhSach = $_GET['soLuongDanhSach'];
} 

if (isset($_GET['trang'])) {
    $trangHienTai = $_GET['trang'];
} else {
    $trangHienTai = 1;
}
$offset = ($trangHienTai - 1) * $soLuongDanhSach;

if (isset($_GET['tuKhoa'])) {
    $keyword = $_GET['tuKhoa'];
    
}else{
    $keyword = "";
}

$keyword = '%' . $keyword . '%';

$dbserver = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "lich_su_giao_dich_san_pham";

$connect = mysqli_connect($dbserver, $dbuser, $dbpass, $dbname);

// Kiểm tra kết nối thành công
if (!$connect) {
    die("Kết nối không thành công: " . mysqli_connect_error());
}

$query = "SELECT * FROM lich_su_giao_dich 
          WHERE (ThoiGian BETWEEN '$startDate' AND '$endDate')
          AND (MayBanHang LIKE '$keyword'
               OR TenSanPham LIKE '$keyword'
               OR GiaSanPham LIKE '$keyword'
               OR TongTien LIKE '$keyword'
               OR ThoiGian LIKE '$keyword'
               OR TienKhachTra LIKE '$keyword'
               OR TienTraLaiKhach LIKE '$keyword')
          ORDER BY id DESC 
          LIMIT $soLuongDanhSach 
          OFFSET $offset";

// $query = "SELECT * FROM lich_su_giao_dich ORDER BY id DESC LIMIT $soLuongDanhSach OFFSET $offset";

$result = mysqli_query($connect, $query);




// if (!$result) {
//     die("Lỗi khi thực hiện truy vấn: " . mysqli_error($connect));
// }


$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

mysqli_close($connect);

// Trả về dữ liệu dưới dạng JSON
header('Content-Type: application/json');
echo json_encode($data);
?>