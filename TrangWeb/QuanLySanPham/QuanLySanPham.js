$(document).ready(function () {
    // Sample product data

    var products = [];

    LoadData();

    function LoadData() {
        $(document).ready(function () {


            // Sử dụng AJAX để gọi tệp PHP và lấy dữ liệu
            $.ajax({
                url: "../SQL_SERVER/QuanLySanPham/LayDuLieuSanPham.php",
                type: "GET",
                success: function (data) {
                    // Lưu dữ liệu vào mảng products
                    products = data;
                    renderProductList();
                    // alert(data);
                    // Hiển thị sản phẩm hoặc thực hiện các thao tác khác ở đây
                },
                error: function (error) {
                    console.log("Error:", error);
                }
            });

            // Tiếp tục xử lý dữ liệu ở đây sau khi nhận được từ máy chủ
        });
    }

    // Function to render the product list
    function renderProductList() {



        var productList = $(".product-list");
        productList.empty();

        var totalQuantity = 0;
        var totalRevenue = 0;
        var totalPrice = 0;

        products.forEach(function (product) {
            var productItem = $("<div class='product-item'></div>");
            var productContent = $("<div class='product-content'>");
            var productInfo = $("<div class='product-info'></div>");
            var productActions = $("<div class='product-actions'></div>");

            var productImage = $("<div class='product-image'></div>");
            var productID = $("<div class='product-id'>" + product.id + "</div>");
            var image = $("<img src='" + product.image + "' class='anh'>");

            var productName = $("<p class='product-name'>" + product.name + "</p>");
            var productPrice = $("<p class='product-price'>$" + product.price + "</p>");

            var productStock = $("<p class='product-stock'></p>");
            var quantityBar = $("<div class='quantity-bar'></div>");
            var quantityRemaining = $("<div class='quantity-remaining'></div>");

            quantityRemaining.css("width", (product.quantity / 100) * 100 + "%");
            quantityRemaining.text(product.quantity + "/100");


            var editButton = $("<button class='edit-button'><i class='fas fa-edit'></i></button>");
            var deleteButton = $("<button class='delete-button'><i class='fas fa-trash'></i></button>");

            // Add click handlers for edit and delete buttons (you can implement these)
            editButton.click(function () {
                // Handle edit button click
            });

            deleteButton.click(function () {
                // Handle delete button click
            });


            productStock.append(quantityBar);
            quantityBar.append(quantityRemaining);

            productInfo.append(productStock, productPrice, productName);
            productActions.append(editButton, deleteButton);

            productImage.append(productID, image);
            productContent.append(productImage, productInfo)

            productItem.append(productContent, productActions);
            productList.append(productItem);

            totalQuantity += parseInt(product.quantity);

            totalRevenue += parseInt(product.price) * parseInt(product.quantity);
            totalPrice += parseInt(product.price);
        });

        $("#total-quantity").text(totalQuantity);
        $("#total-revenue").text("$" + totalRevenue);
        $("#total-price").text("$" + totalPrice);
    }

    // Initial render of the product list


    // Add product button click handler (you can implement this)
    $(".add-product").click(function () {
        // Handle add product button click
    });


    // Gắn sự kiện click cho nút xóa
    $(document).on("click", ".delete-button", function () {
        var productItem = $(this).closest(".product-item"); // Tìm sản phẩm cha gần nhất
        var productId = productItem.find(".product-id").text(); // Lấy ID sản phẩm

        var confirmation = confirm("Bạn có muốn xóa sản phẩm này không?");
        // Gửi yêu cầu xóa sản phẩm đến máy chủ (thay đổi đường dẫn và phương thức HTTP cần thiết)
        if (confirmation) {
            $.ajax({
                url: "../SQL_SERVER/QuanLySanPham/XoaSanPham.php", // Đường dẫn tới tệp xử lý xóa sản phẩm
                method: "POST", // Phương thức HTTP (có thể là GET hoặc POST)
                data: { id: productId }, // Dữ liệu cần gửi (ID sản phẩm)
                success: function (response) {
                    // Xử lý kết quả thành công (nếu cần)
                    // console.log("Xóa sản phẩm thành công");

                    // Sau khi xóa thành công, tải lại danh sách sản phẩm
                    LoadData();
                },
                error: function (error) {
                    // Xử lý lỗi (nếu cần)
                    console.error("Lỗi khi xóa sản phẩm: " + error);
                }
            });
        }
    });


    $(document).on("click", ".edit-button", function () {
        // Lấy thông tin sản phẩm đã chọn

        $("#edit-form").show();

        var productItem = $(this).closest(".product-item");
        var productId = productItem.find(".product-id").text();
        var productName = productItem.find(".product-name").text();
        var productPrice = parseFloat(productItem.find(".product-price").text().replace("$", ""));
        var productQuantity = parseInt(productItem.find(".quantity-remaining").text());
        var productImg = productItem.find('img').attr("src");
        // Hiển thị thông tin sản phẩm trong form chỉnh sửa
        $("#edit-product-id").val(productId);
        $("#edit-product-name").val(productName);
        $("#edit-product-price").val(productPrice);
        $("#edit-product-quantity").val(productQuantity);

        // Ẩn hình ảnh trước đó (nếu có)

        $("#edit-form #image").attr("src", productImg);

        // Hiển thị form chỉnh sửa

    });

    // Xử lý sự kiện khi người dùng chọn hình ảnh (sử dụng input[type=file])
    $("#edit-product-image").change(function () {
        var selectedFile = this.files[0];

        if (selectedFile) {

            var fileName = selectedFile.name;
            var reader = new FileReader();

            // Xử lý khi hình ảnh được chọn hoàn thành việc đọc
            reader.onload = function (e) {
                // Hiển thị hình ảnh trong form
                $("#edit-form #image").attr("src", "../Anh/" + fileName);
            };

            // Đọc hình ảnh
            reader.readAsDataURL(selectedFile);
        }
    });

    // Xử lý khi người dùng lưu thay đổi trong form chỉnh sửa
    $(document).on("click", "#edit-form .save-button", function () {


        // Lấy thông tin sản phẩm đã chỉnh sửa từ form
        var productId = $("#edit-product-id").val();
        var productName = $("#edit-product-name").val();
        var productPrice = parseFloat($("#edit-product-price").val());
        var productQuantity = parseInt($("#edit-product-quantity").val());

        // Lấy hình ảnh đã chọn (nếu có)
        var selectedFile = $("#edit-form #image").attr("src");

        suaSanPham(productId, productName, productPrice, productQuantity, selectedFile);

        LoadData();

        $("#edit-form").hide();
    });


    function suaSanPham(
        productId, productName,
        productPrice, productQuantity,
        productImg) {
        // e.preventDefault();
        $.ajax({
            url: "../SQL_SERVER/QuanLySanPham/SuaSanPham.php",
            method: "POST",
            data: {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                img: productImg
            },
            success: function (response) {
                // Xử lý kết quả từ máy chủ (có thể hiển thị thông báo thành công)
                console.log("Cập nhật sản phẩm thành công");
            },
            error: function (error) {
                // Xử lý lỗi nếu có
                console.error("Lỗi khi cập nhật sản phẩm: " + error);
            }
        });
    }




    $(document).on("click", ".add-product", function () {
        // Lấy thông tin sản phẩm đã chọn

        $("#add-form").show();


    });

    // Xử lý sự kiện khi người dùng chọn hình ảnh (sử dụng input[type=file])
    $("#add-product-image").change(function () {
        var selectedFile = this.files[0];

        if (selectedFile) {

            var fileName = selectedFile.name;
            var reader = new FileReader();

            // Xử lý khi hình ảnh được chọn hoàn thành việc đọc
            reader.onload = function (e) {
                // Hiển thị hình ảnh trong form
                $("#add-form #image").attr("src", "../Anh/" + fileName);
            };

            // Đọc hình ảnh
            reader.readAsDataURL(selectedFile);
        }
    });

    // Xử lý khi người dùng lưu thay đổi trong form chỉnh sửa
    $(document).on("click", "#add-form .save-button", function () {


        // Lấy thông tin sản phẩm đã chỉnh sửa từ form
        var productId = $("#add-product-id").val();
        var productName = $("#add-product-name").val();
        var productPrice = parseFloat($("#add-product-price").val());
        var productQuantity = parseInt($("#add-product-quantity").val());

        // Lấy hình ảnh đã chọn (nếu có)
        var selectedFile = $("#add-form #image").attr("src");


        themSanPham(productId, productName, productPrice, productQuantity, selectedFile);

        LoadData();

        $("#add-form").hide();
    });


    function themSanPham(
        productId, productName,
        productPrice, productQuantity,
        productImg) {
        // e.preventDefault();
        $.ajax({
            url: "../SQL_SERVER/QuanLySanPham/ThemSanPham.php",
            method: "POST",
            data: {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                img: productImg
            },
            success: function (response) {
                // Xử lý kết quả từ máy chủ (có thể hiển thị thông báo thành công)
                alert("Thêm sản phẩm thành công");
            },
            error: function (error) {
                // Xử lý lỗi nếu có
                alert("Lỗi khi Thêm sản phẩm: " + error);
            }
        });
    }

});
