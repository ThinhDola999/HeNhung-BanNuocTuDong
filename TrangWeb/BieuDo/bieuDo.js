$(document).ready(function() {
    $.ajax({
        url: "../BieuDo/SqlBieuDo.php",
        method: 'GET',
        success: function(data) {
            var thang = [];
            var doanhThu = [];

            for (var i in data) {
                thang.push('Tháng ' + data[i].thang);
                doanhThu.push(data[i].doanh_thu);
            }

            var ctx = $('#doanh-thu-chart');

            var doanhThuChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: thang,
                    datasets: [{
                        label: 'Doanh thu hàng tháng (VND)',
                        data: doanhThu,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Màu sắc cho cột
                        borderColor: 'rgba(54, 162, 235, 1)', // Màu sắc cho đường viền
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value, index, values) {
                                    return value.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    });
                                }
                            }
                        },
                        // x: { // Thêm đơn vị "Tháng" cho trục x
                        //     ticks: {
                        //         callback: function(value, index, values) {
                        //             return value + ' Tháng';
                        //         }
                        //     }
                        // }

                    }
                }
            });


            var pieCtx = $('#doanh-thu-pie-chart');

            var pieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: thang,
                    datasets: [{
                        label: 'Doanh thu hàng tháng (VND)',
                        data: doanhThu,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 205, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(201, 203, 207, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(201, 203, 207, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    var label = context.label || '';
                                    var value = context.parsed || 0;
            
                                    var total = context.dataset.data.reduce(function(previousValue, currentValue) {
                                        
                                        
                                        return parseInt(previousValue) + parseInt(currentValue);
                                    });
                                   
                                    var percentage = Math.round((value / total) * 100);
                                    return label + ': ' + percentage + '%';
                                }
                            }
                        }
                    }
                }
            });




        },
        error: function(data) {
            console.log(data);
        }


    });


});

$(document).ready(function() {
    $("#close-button").click(function() {
        
        var close = $("#bieu_do");

        if (close.is(":hidden")) {
            close.show();

            
        } else {
            close.hide();
           
        }
    });
});