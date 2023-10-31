
<?php
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];


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
          ORDER BY id DESC";
         
// $result = mysqli_query($connect, $query);

$tongSoDonHang = mysqli_num_rows(mysqli_query($connect, $query));

$sql = "SELECT SUM(TongTien) AS TotalRevenue 
       FROM lich_su_giao_dich 
       WHERE ThoiGian BETWEEN '$startDate' AND '$endDate'";

$result_2 = $connect->query($sql);


if ($result_2) {
   
    $row = $result_2->fetch_assoc();
    

    $doanhthu = $row['TotalRevenue'];


}
$response = ["tongDonHang" => $tongSoDonHang,
             "tongDoanhThu" => $doanhthu,
            ];

echo json_encode($response);


mysqli_close($connect);


?>