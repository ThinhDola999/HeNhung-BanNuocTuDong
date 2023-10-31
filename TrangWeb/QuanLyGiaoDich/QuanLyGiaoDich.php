<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="../QuanLyGiaoDich//QuanLyGiaoDich.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> -->
    <title>Quản lý bán nước</title>
</head>

<body>
    <h1 class="h1-GiaoDich">Lịch Sử Giao Dịch</h1>
    <div class="GiaoDich">
        <div id="bieu_do">

        </div>
        <div class="thoiGian">
            <div class="date-filter">
                <i class="fas fa-calendar"></i>
                Từ ngày: <input type="date" id="start-date"> Đến ngày: <input type="date" id="end-date">
                <button id="filter-button">Lọc</button>
            </div>
        </div>


        <div class="summary">
            <div class="box">
                <!-- Thêm icon cho số dư -->
                <i class="fas fa-dollar-sign"></i>
                <p>Số Dư:</p>
                <p id="so_du">200000000đ</p>
                <button id="withdraw">Rút Tiền</button>
            </div>
            <div class="box">
                <!-- Thêm icon cho tổng hóa đơn -->
                <i class="fas fa-file-invoice"></i>
                <p>Tổng Hóa Đơn:</p>
                <p id="tong_hoa_don">123</p>
            </div>
            <div class="box">
                <!-- Thêm icon cho tổng doanh thu -->
                <i class="fas fa-chart-line"></i>
                <p>Tổng Doanh Thu:</p>
                <p id="tong_doanh_thu">9999999$</p>
                <button id="revenue-chart">Biểu Đồ</button>
            </div>
        </div>

        <section class="custom-search">
            <div class="show_danh_sach">
                <p>Hiển Thị</p>
                <select id="show-entries">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
                <p class="danh_sach">Danh Sách</p>
            </div>
            <div class="tim_kiem">
                <input type="text" id="search" placeholder="Tìm kiếm...">
                <button id="searchBtn">Tìm kiếm</button>
            </div>

        </section>

        <div class="danhSachGiaoDich">
            <table class="transaction-history">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Máy Bán Hàng</th>
                        <th>Thời Gian</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Hình Ảnh</th>
                        <th>Giá Sản Phẩm</th>
                        <th>Tổng Tiền</th>
                        <th>Tiền Khách Trả</th>
                        <th>Tiền Trả Lại Khách</th>
                        <th>Trạng Thái</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Dữ liệu danh sách giao dịch sẽ được thêm vào đây -->
                </tbody>
            </table>
        </div>

        <footer>
            <div class="pagination">

            </div>
        </footer>
    </div>
</body>

<script src="../QuanLyGiaoDich/QuanLyGiaoDich.js"></script>

</html>