<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../QuanLySanPham/QuanLySanPham.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <title>Quản Lý Sản Phẩm</title>
</head>

<body>

    <div class="SanPham">
        <h1 class="h1-sanpham">Quản Lý Sản Phẩm</h1>
        <div class="container">
            <div class="product-list">
                <!-- Danh sách sản phẩm sẽ được hiển thị ở đây -->
            </div>

            <div class="summary">
                <div class="total-quantity">
                    <i class="fas fa-box"></i>
                    <p>Tổng Số Lượng</p>
                    <span id="total-quantity">0</span>
                </div>
                <div class="total-revenue">
                    <i class="fas fa-chart-line"></i>
                    <p>Tổng Doanh Thu</p>
                    <span id="total-revenue">0</span>
                </div>
                <div class="total-price">
                    <i class="fas fa-dollar-sign"></i>
                    <p>Số Dư</p>
                    <span id="total-price">0</span>
                </div>
            </div>
        </div>

        <div class="add-product">
            <i class="fas fa-plus"></i>
        </div>
    </div>

    <div id="edit-form" style="display: none;">
        <!-- Form chỉnh sửa sản phẩm -->
        <input type="number" id="edit-product-id" placeholder="Tên id">
        <input type="text" id="edit-product-name" placeholder="Tên sản phẩm">
        <input type="number" id="edit-product-price" placeholder="Giá sản phẩm">
        <input type="number" id="edit-product-quantity" placeholder="Số lượng sản phẩm">

        <!-- Trường đầu vào loại file cho hình ảnh -->
        <img id="image" src="">
        <input type="file" id="edit-product-image">

        <button class="save-button">Lưu</button>
    </div>


    <div id="add-form" style="display: none;">
        <!-- Form chỉnh sửa sản phẩm -->
        <input type="number" id="add-product-id" placeholder="Tên id (không trùng id)">
        <input type="text" id="add-product-name" placeholder="Tên sản phẩm">
        <input type="number" id="add-product-price" placeholder="Giá sản phẩm">
        <input type="number" id="add-product-quantity" placeholder="Số lượng sản phẩm">

        <!-- Trường đầu vào loại file cho hình ảnh -->
        <img id="image" src="">
        <input type="file" id="add-product-image">

        <button class="save-button">Lưu</button>
    </div>


    <script src="../QuanLySanPham/QuanLySanPham.js"></script>
</body>

</html>