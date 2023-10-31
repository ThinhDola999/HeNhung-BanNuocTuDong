-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 28, 2023 lúc 07:43 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `lich_su_giao_dich_san_pham`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_su_giao_dich`
--

CREATE TABLE `lich_su_giao_dich` (
  `ID` int(11) NOT NULL,
  `IDHoaDon` varchar(20) DEFAULT NULL,
  `MayBanHang` varchar(255) DEFAULT NULL,
  `ThoiGian` datetime DEFAULT NULL,
  `TenSanPham` varchar(255) DEFAULT NULL,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `GiaSanPham` decimal(10,2) DEFAULT NULL,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `TienKhachTra` decimal(10,2) DEFAULT NULL,
  `TienTraLaiKhach` decimal(10,2) DEFAULT NULL,
  `TrangThai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_su_giao_dich`
--

INSERT INTO `lich_su_giao_dich` (`ID`, `IDHoaDon`, `MayBanHang`, `ThoiGian`, `TenSanPham`, `HinhAnh`, `GiaSanPham`, `TongTien`, `TienKhachTra`, `TienTraLaiKhach`, `TrangThai`) VALUES
(1, '20230923-0001', 'Máy 11', '2023-09-23 10:00:00', 'Sản phẩm 11', NULL, 100.00, 100.00, 150.00, 50.00, 'Hoàn thành'),
(2, '20230923-0002', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, 'Đã thanh toán'),
(3, '20230923-0003', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, 'Hoàn thành'),
(4, '20230923-0004', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(5, '20230923-0005', 'Máy 1', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(6, '20230923-0006', 'Máy 1', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(7, '20230923-0007', 'Máy 2', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(8, '20230923-0008', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(9, '20230923-0009', 'Máy 2', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(10, '20230923-0010', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(11, '20230923-0011', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(12, '20230923-0012', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(13, '20230923-0013', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(14, '20230923-0014', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(15, '20230923-0015', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(16, '20230923-0016', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(17, '20230923-0017', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(18, '20230923-0018', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(19, '20230923-0019', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(20, '20230923-0020', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(21, '20230923-0021', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(22, '20230923-0022', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(23, '20230923-0023', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(24, '20230923-0024', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(25, '20230923-0025', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(26, '20230923-0026', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(27, '20230923-0027', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(28, '20230923-0028', 'Máy 1', '2023-09-23 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(29, '20230923-0029', 'Máy 2', '2023-09-23 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(30, '20230923-0030', 'Máy 3', '2023-09-23 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(31, NULL, 'Máy 1', '2023-10-01 10:00:00', 'Sản phẩm 1', NULL, 100.00, 100.00, 150.00, 50.00, NULL),
(32, NULL, 'Máy 2', '2023-10-02 11:00:00', 'Sản phẩm 2', NULL, 150.00, 150.00, 200.00, 50.00, NULL),
(33, NULL, 'Máy 3', '2023-10-03 12:00:00', 'Sản phẩm 3', NULL, 120.00, 120.00, 180.00, 60.00, NULL),
(34, NULL, 'Máy 4', '2023-10-04 13:00:00', 'Sản phẩm 4', NULL, 90.00, 90.00, 100.00, 10.00, NULL),
(35, NULL, 'Máy 5', '2023-10-05 14:00:00', 'Sản phẩm 5', NULL, 200.00, 200.00, 250.00, 50.00, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `id` int(11) NOT NULL,
  `TenSanPham` varchar(255) NOT NULL,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `GiaTien` decimal(10,2) NOT NULL,
  `SoLuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`id`, `TenSanPham`, `HinhAnh`, `GiaTien`, `SoLuong`) VALUES
(1, 'Nước Cam', '../Anh/nuocCam.jpg', 2.00, 50),
(2, 'Nước Dưa Hấu', '../Anh/nuocDuaHau.jpg', 3.49, 75),
(3, 'Nước Nho', '../Anh/nuocNho.jpg', 39.99, 75),
(4, 'Nước Ổi', '../Anh/nuocOi.jpg', 2.29, 90),
(5, 'Nước Xoài', '../Anh/nuocXoai.jpg', 3.99, 60),
(6, 'Nước Ga', '../Anh/nuocga.jpg', 2.79, 54),
(7, 'Nước Xoài', '../Anh/nuocXoai.jpg', 4.00, 3),
(8, 'Nước Nho', '../Anh/nuocNho.jpg', 9.00, 90);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `lich_su_giao_dich`
--
ALTER TABLE `lich_su_giao_dich`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
