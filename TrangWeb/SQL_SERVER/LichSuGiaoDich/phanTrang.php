
<?php
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

if (isset($_GET['tukhoa'])) {
    $keyword = $_GET['tukhoa'];
    
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

// Câu truy vấn SQL để lấy dữ liệu từ bảng "new"
// $query = "SELECT * FROM lich_su_giao_dich ORDER BY id ASC";

// $query = "SELECT * FROM new ORDER BY id ASC LIMIT $soLuongMoiTrang OFFSET $offset";
// $query = "SELECT * FROM lich_su_giao_dich ORDER BY id DESC LIMIT $soLuongMoiTrang OFFSET $offset";
// Thực hiện truy vấn
// $query = "SELECT * FROM lich_su_giao_dich ORDER BY id ASC ";
$query = "SELECT * FROM lich_su_giao_dich 
          WHERE (ThoiGian BETWEEN '$startDate' AND '$endDate')
          AND (MayBanHang LIKE '$keyword'
               OR TenSanPham LIKE '$keyword'
               OR GiaSanPham LIKE '$keyword'
               OR TongTien LIKE '$keyword'
               OR ThoiGian LIKE '$keyword'
               OR TienKhachTra LIKE '$keyword'
               OR TienTraLaiKhach LIKE '$keyword')
          ORDER BY id DESC";
         

$result = mysqli_query($connect, $query);

// if (!$result) {
//     die("Lỗi khi thực hiện truy vấn: " . mysqli_error($connect));
// }

$tongSoHang = mysqli_num_rows(mysqli_query($connect, $query));
$response = ["totalRows" => $tongSoHang];

echo json_encode($response);


mysqli_close($connect);


?>