<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản Lý Bán Hàng</title>
    <link rel="stylesheet" href="MayBanHangNuocTuDong.css">
</head>

<body>
    <div class="MayBanHang">
        <div class="logo-icon">
            <div class="logo">
                <img src="../Anh/Logo.png"></img>
            </div>
            <div class="user-icon"><i class="fas fa-user"></i></div>
        </div>
        <div class="than">

            <aside>

                <i class="icon-menu fas fa-bars"></i>
                <nav>
                    <ul>
                        <li>
                            <a class="trang" data-page="../QuanLySanPham/QuanLySanPham.php">
                                <i class="fas fa-cubes"></i>
                                <p> Quản Lý Sản Phẩm</p>
                            </a>
                        </li>
                        <li>
                            <a class="trang" data-page="../QuanLyGiaoDich/QuanLyGiaoDich.php">
                                <i class="fas fa-history"></i>
                                <p>Lịch Sử Giao Dịch</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
        <div class="hien_thi_trang">
            <?php
            //    require("../TrangWeb/QuanLySanPham/QuanLySanPham.php");
            ?>
        </div>
        <div>

            <script src="MayBanHangNuocTuDong.js">
            </script>
</body>

</html>