$(document).ready(function () {
    // Toggle the menu when clicking the menu icon
    var asideCollapsed = false;
    $('.icon-menu').click(function () {
        if (asideCollapsed) {
            // Nếu aside đã thu gọn, mở rộng lại
            $('aside').removeClass('menu-collapsed');
            $('.hien_thi_trang').css('margin-left', '70px');
            asideCollapsed = false;
        } else {
            // Nếu aside đang mở rộng, thu gọn
            $('aside').addClass('menu-collapsed');

            $('.hien_thi_trang').css('margin-left', '230px');
            asideCollapsed = true;
        }
    });



    var dataTrang = $('.hien_thi_trang'); // Lấy đối tượng .hien_thi_trang
    // Xử lý khi click vào các mục menu
    $('aside nav ul li a').click(function (e) {
        dataTrang.show();
      
        var page = $(this).data('page');
        $.ajax({
            url: page,
            type: 'GET',
            success: function (data) {
                dataTrang.html(data); // Đưa nội dung vào .hien_thi_trang
            }
        });
        e.preventDefault();

    });
});

