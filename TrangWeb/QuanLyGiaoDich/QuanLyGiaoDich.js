

$(document).ready(function () {

    var currentDate = new Date();

    // Lấy ngày đầu tháng
    var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Lấy ngày cuối tháng bằng cách lấy ngày đầu tháng của tháng sau, sau đó trừ 1 ngày
    var nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    var lastDay = new Date(nextMonth - 1);


    // Đặt giá trị mặc định cho trường ngày bắt đầu và kết thúc
    $("#start-date").val(firstDay.toISOString().slice(0, 10));
    $("#end-date").val(lastDay.toISOString().slice(0, 10));



    doanhthhu_donhang();

    LoadDanhSachGiaoDich($("#show-entries").val(), 1, $("#search").val());



    $(document).on("click", "#searchBtn", function () {

        var tuKhoa = $("#search").val();

        LoadDanhSachGiaoDich($("#show-entries").val(), 1, tuKhoa);

        TinhSoLuongTrang($("#show-entries").val(), function (TongSoTrang) {
            // Khi callback được gọi, bạn đã có giá trị TongSoTrang

            phanTrang(TongSoTrang);


        });
    });

    function doanhthhu_donhang() {
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        $.ajax({
            url: "../SQL_SERVER/LichSuGiaoDich/DoanhThu_DonHang.php?startDate=" + startDate + "&endDate=" + endDate,
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Truy cập giá trị totalRows từ dữ liệu JSON
                var tongHoaDon = data.tongDonHang;
                $("#tong_hoa_don").text(tongHoaDon);
                var tongDoanhThu = data.tongDoanhThu;
                $("#tong_doanh_thu").text(tongDoanhThu + "đ");

            },
            error: function (xhr, status, error) {
                console.log("Lỗi khi tải dữ liệu: " + error);
            }

        });
    }
    $(document).on("click", "#filter-button", function () {



        doanhthhu_donhang();

        LoadDanhSachGiaoDich($("#show-entries").val(), 1, $("#search").val());

        TinhSoLuongTrang($("#show-entries").val(), function (TongSoTrang) {
            // Khi callback được gọi, bạn đã có giá trị TongSoTrang

            phanTrang(TongSoTrang);


        });
    });

    TinhSoLuongTrang($("#show-entries").val(), function (TongSoTrang) {
        // Khi callback được gọi, bạn đã có giá trị TongSoTrang

        phanTrang(TongSoTrang);


    });


    $(document).on("click", ".trang", function () {

        var trang = $(this).data("trang");
        phan_trang = trang;
        $(".trang-hien-tai").removeClass("trang-hien-tai");
        $(this).addClass("trang-hien-tai");
        LoadDanhSachGiaoDich($("#show-entries").val(), phan_trang, $("#search").val());

    });



    $(document).on("click", ".next", function () {

        TinhSoLuongTrang($("#show-entries").val(), function (TongSoTrang) {

            var trang = $(".trang-hien-tai").data("trang");
            if (parseInt(trang) > 0 && parseInt(trang) < parseInt(TongSoTrang)) {

                id = trang + 1;
                $(".trang-hien-tai").removeClass("trang-hien-tai");
                $("#trang_" + id).addClass("trang-hien-tai");
                LoadDanhSachGiaoDich($("#show-entries").val(), id, $("#search").val());

            }

        });

    });


    $(document).on("click", ".previous", function () {

        TinhSoLuongTrang($("#show-entries").val(), function (TongSoTrang) {

            var trang = $(".trang-hien-tai").data("trang");
            if (parseInt(trang) > 1 && parseInt(trang) <= parseInt(TongSoTrang)) {

                id = trang - 1;
                $(".trang-hien-tai").removeClass("trang-hien-tai");
                $("#trang_" + id).addClass("trang-hien-tai");
                LoadDanhSachGiaoDich($("#show-entries").val(), id, $("#search").val());

            }

        });

    });



    function LoadDanhSachGiaoDich(soLuongDanhSach, trang, tuKhoa) {

        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        $.ajax({
            url: "../SQL_SERVER/LichSuGiaoDich/select_DanhSachLichSuGiaoDich.php?soLuongDanhSach=" + soLuongDanhSach +
                "&trang=" + trang + "&tuKhoa=" + tuKhoa + "&startDate=" + startDate + "&endDate=" + endDate,
            type: "GET",
            dataType: "json",

            success: function (data) {
                var html = "<table class='transaction-history'>";
                html += "<thead>";
                html += "<tr>" +
                    "<th>STT</th>" +
                    "<th>IDHoaDon</th>" +
                    "<th>Thời Gian</th>" +
                    "<th>Tổng Tiền</th>" +
                    "<th>Tiền Khách Trả</th>" +
                    "<th>Tiền Trả Lại Khách</th>" +
                    "<th>Trạng Thái</th>";
                html += "</tr>";
                html += "</thead>";
                // var STT = 1;
                STT = trang * soLuongDanhSach - (soLuongDanhSach - 1);
                html += "<tbody>";
                data.forEach(function (row) {

                    html += '<tr>';
                    html += "<td>" + STT + "</td>";
                    html += "<td>" + row.IDHoaDon + "</td>";

                    html += "<td>" + row.ThoiGian + "</td>"
                    html += "<td>" + row.TongTien + "</td>";
                    html += "<td>" + row.TienKhachTra + "</td>";
                    html += "<td>" + row.TienTraLaiKhach + "</td>";
                    html += "<td>" + row.TrangThai + "</td>";
                    html += "</tr>";

                    // trang++;
                    STT++;
                });
                html += "</tbody>";

                html += "</table>";
                $(".transaction-history").html(html);

                event.preventDefault();

            },
            // error: function () {
            //     alert("Lỗi khi tải dữ liệu danh sach lich su giao dich.");
            // }
        });



    }

    $("#show-entries").change(function () {

        var selectedValue = $(this).val();

        LoadDanhSachGiaoDich(selectedValue, 1, $("#search").val());
        TinhSoLuongTrang(selectedValue, function (TongSoTrang) {
            // Khi callback được gọi, bạn đã có giá trị TongSoTrang

            phanTrang(TongSoTrang);


        });

    });


    function TinhSoLuongTrang(SoHangTrongTrang, callback) {
        var tukhoa = $("#search").val();
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        $.ajax({
            url: "../SQL_SERVER/LichSuGiaoDich/phanTrang.php?tukhoa=" + tukhoa + "&startDate=" + startDate + "&endDate=" + endDate,
            type: "GET",
            dataType: "json",
            success: function (data) {
                // Truy cập giá trị totalRows từ dữ liệu JSON
                tongHang = data.totalRows;


                var TongSoTrang = Math.ceil(tongHang / SoHangTrongTrang);


                callback(TongSoTrang);
            },
            error: function (xhr, status, error) {
                console.log("Lỗi khi tải dữ liệu: " + error);
            }

        });

    }


    function phanTrang(TongSoTrang) {

        var paginationDiv = $(".pagination");
        paginationDiv.empty();
        var iconLeft = $("<i></i>").addClass("fas fa-chevron-left");
        var iconRight = $("<i></i>").addClass("fas fa-chevron-right");

        var buttonLeft = $("<button></button>")
            .addClass('previous')
            .append(iconLeft);

        var buttonRight = $("<button></button>")
            .addClass('next')
            .append(iconRight);

        paginationDiv.prepend(buttonLeft);

        for (var i = 1; i <= TongSoTrang; i++) {
            var linkClass = (i === 1) ? "trang trang-hien-tai" : "trang";
            var linkId = "trang_" + i;
            var linkDataTrang = i;

            var link = $("<a></a>")
                .addClass(linkClass)
                .attr("id", linkId)
                .attr("data-trang", linkDataTrang)
                .text(i);

            paginationDiv.append(link);
        }

        paginationDiv.append(buttonRight);


    }




});
$(document).on("click", "#revenue-chart", function () {


    // Lấy ID của dòng từ thuộc tính data-id của thẻ <a>
    var bieuDo = $("#bieu_do");
    // Sử dụng AJAX để tải nội dung từ file chitiet.php
    $.ajax({
        url: "BieuDo/bieuDo.php",
        type: "GET",
        // data: { id: id }, // Truyền ID của dòng cần hiển thị chi tiết
        success: function (data) {
            // Hiển thị nội dung từ chitiet.php trong một phần tử trên trang

            if (bieuDo.is(":hidden")) {
                $("#bieu_do").html(data);
                bieuDo.show();
            }
        },
        error: function () {
            alert("Có lỗi xảy ra khi tải thông tin chi tiết.");
        },
    });


});




