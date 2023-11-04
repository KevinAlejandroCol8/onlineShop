-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2023 a las 09:16:45
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_onlyshop`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descuentos`
--

CREATE TABLE `descuentos` (
  `DescuentoID` int(11) NOT NULL,
  `NombreDescuento` varchar(50) NOT NULL,
  `Codigo_Descuento` varchar(50) DEFAULT NULL,
  `PorcentajeDescuento` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descuentos`
--

INSERT INTO `descuentos` (`DescuentoID`, `NombreDescuento`, `Codigo_Descuento`, `PorcentajeDescuento`) VALUES
(1, 'Gran descuento', 'KEVIN', 13.00),
(2, 'Mega Descuento ', 'AFEDO', 13.00),
(3, 'Mega Yisus', 'YISUS', 12.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallespedidos`
--

CREATE TABLE `detallespedidos` (
  `DetalleID` int(11) NOT NULL,
  `PedidoID` int(11) DEFAULT NULL,
  `ProductoID` int(11) DEFAULT NULL,
  `CantidadProducto` int(11) DEFAULT NULL,
  `PrecioUnitario` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallespedidos`
--

INSERT INTO `detallespedidos` (`DetalleID`, `PedidoID`, `ProductoID`, `CantidadProducto`, `PrecioUnitario`) VALUES
(3, 5940, 2, 2, 2500.00),
(4, 5940, 1, 2, 7000.00),
(5, 13, 3, 2, 12000.00);

--
-- Disparadores `detallespedidos`
--
DELIMITER $$
CREATE TRIGGER `after_detallepedido_insert` AFTER INSERT ON `detallespedidos` FOR EACH ROW BEGIN
    UPDATE Productos
    SET CantidadDisponible = CantidadDisponible - NEW.CantidadProducto
    WHERE ProductoID = NEW.ProductoID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `DetalleID` int(11) NOT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `CostoAdquisicion` decimal(10,2) DEFAULT NULL,
  `ProductoID` int(11) DEFAULT NULL,
  `CompraID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`DetalleID`, `Cantidad`, `CostoAdquisicion`, `ProductoID`, `CompraID`) VALUES
(43, 5, 300.00, 2, 159),
(44, 6, 125.00, 1, 159),
(45, 5, 123.00, 2, 6803),
(46, 6, 343.00, 1, 6803),
(47, 2, 5000.00, 3, 3566);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encabezado_compras`
--

CREATE TABLE `encabezado_compras` (
  `CompraID` int(11) NOT NULL,
  `fechaCompra` timestamp NOT NULL DEFAULT current_timestamp(),
  `MontoCompra` decimal(10,2) DEFAULT NULL,
  `CantidadTotal` int(11) DEFAULT NULL,
  `ProveedorID` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `encabezado_compras`
--

INSERT INTO `encabezado_compras` (`CompraID`, `fechaCompra`, `MontoCompra`, `CantidadTotal`, `ProveedorID`) VALUES
(159, '2023-11-04 05:19:15', 425.00, 11, 2),
(3566, '2023-11-04 07:52:26', 5000.00, 2, 3),
(6803, '2023-11-04 07:43:32', 466.00, 11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `FacturaID` int(11) NOT NULL,
  `PedidoID` int(11) DEFAULT NULL,
  `FechaFactura` date DEFAULT NULL,
  `InformacionCliente` varchar(255) DEFAULT NULL,
  `TotalFactura` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventariotienda`
--

CREATE TABLE `inventariotienda` (
  `InventarioID` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Cantidad` int(11) DEFAULT NULL,
  `ProductoID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventariotienda`
--

INSERT INTO `inventariotienda` (`InventarioID`, `fecha`, `Cantidad`, `ProductoID`) VALUES
(49, '2023-11-04 05:19:15', 5, 2),
(50, '2023-11-04 05:19:26', 6, 1),
(51, '2023-11-04 07:43:32', 5, 2),
(52, '2023-11-04 07:43:41', 6, 1),
(53, '2023-11-04 07:52:26', 2, 3);

--
-- Disparadores `inventariotienda`
--
DELIMITER $$
CREATE TRIGGER `after_inventario_insert` AFTER INSERT ON `inventariotienda` FOR EACH ROW BEGIN
    UPDATE Productos
    SET CantidadDisponible = CantidadDisponible + NEW.Cantidad
    WHERE ProductoID = NEW.ProductoID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `PagoID` int(11) NOT NULL,
  `FacturaID` int(11) DEFAULT NULL,
  `FechaPago` date DEFAULT NULL,
  `MetodoPago` varchar(50) DEFAULT NULL,
  `MontoPago` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `PedidoID` int(11) NOT NULL,
  `UsuarioID` int(11) DEFAULT NULL,
  `FechaPedido` date DEFAULT current_timestamp(),
  `EstadoPedido` varchar(50) DEFAULT NULL,
  `TotalPedido` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`PedidoID`, `UsuarioID`, `FechaPedido`, `EstadoPedido`, `TotalPedido`) VALUES
(13, 1, '2023-11-04', NULL, 23385.60),
(5940, 1, '2023-11-04', NULL, 18513.60);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ProductoID` int(11) NOT NULL,
  `NombreProducto` varchar(255) NOT NULL,
  `DescripcionProducto` text DEFAULT NULL,
  `PrecioVenta` decimal(10,2) DEFAULT NULL,
  `CostoAdquisicion` decimal(10,2) DEFAULT NULL,
  `CantidadDisponible` int(11) DEFAULT 0,
  `Imagen` varchar(255) DEFAULT NULL,
  `TipoProductoID` int(11) DEFAULT NULL,
  `SKU` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ProductoID`, `NombreProducto`, `DescripcionProducto`, `PrecioVenta`, `CostoAdquisicion`, `CantidadDisponible`, `Imagen`, `TipoProductoID`, `SKU`) VALUES
(1, 'Test 1', 'Descripción del test 1', 7000.00, NULL, 10, '1698978876397.jpg', 3, 'KCHSDDWV'),
(2, 'Zapatos 2', 'Zapatos Bonitos 2', 2500.00, 5.00, 13, '1698978876397.jpg', 1, 'AASDASD1'),
(3, 'Avion', 'Avion muy bonito', 12000.00, NULL, 0, '1699084257808.jpeg', 4, 'VIWCYOCP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `ProveedorID` int(11) NOT NULL,
  `NombreProveedor` varchar(255) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `InformacionContacto` varchar(255) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `CorreoElectronico` varchar(255) DEFAULT NULL,
  `SitioWeb` varchar(255) DEFAULT NULL,
  `TipoProductoServicio` varchar(100) DEFAULT NULL,
  `FechaInicioRelacion` date DEFAULT NULL,
  `NotasComentarios` text DEFAULT NULL,
  `CategoriaProveedor` varchar(100) DEFAULT NULL,
  `EstadoRelacion` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`ProveedorID`, `NombreProveedor`, `Direccion`, `InformacionContacto`, `Telefono`, `CorreoElectronico`, `SitioWeb`, `TipoProductoServicio`, `FechaInicioRelacion`, `NotasComentarios`, `CategoriaProveedor`, `EstadoRelacion`) VALUES
(1, 'Carlos Rivas', 'Guatemala, Guatemala', 'Carlos', '45859636', 'example@gmail.com', 'example.com', 'Tecnologia ', '2023-11-02', 'Comentarios cosas.', NULL, 'activo'),
(2, 'Pedro Marines', 'Guatemala, Guatemala', 'Pedro ', '79142589', 'example@gmail.com', 'example.com', 'Zapatoz', '2023-11-02', 'Grandes cosas ', NULL, 'activo'),
(3, 'Niko El yisus', 'Zuisa', 'Miguel', '45897489', 'exmaple@gmial.com', 'exam.com', 'Transporte', '2023-11-04', 'Funciona chiquito', NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposproducto`
--

CREATE TABLE `tiposproducto` (
  `TipoProductoID` int(11) NOT NULL,
  `NombreTipoProducto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposproducto`
--

INSERT INTO `tiposproducto` (`TipoProductoID`, `NombreTipoProducto`) VALUES
(1, 'Tecnologia'),
(2, 'Ropa'),
(3, 'Zapatos'),
(4, 'Aviones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuarioID` int(11) NOT NULL,
  `NombreUsuario` varchar(50) NOT NULL,
  `Contrasenia` varchar(255) NOT NULL,
  `NombreCompleto` varchar(100) DEFAULT NULL,
  `CorreoElectronico` varchar(100) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `FechaRegistro` date DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `tipoRool` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UsuarioID`, `NombreUsuario`, `Contrasenia`, `NombreCompleto`, `CorreoElectronico`, `Direccion`, `FechaRegistro`, `Activo`, `tipoRool`) VALUES
(1, 'Alejandro', '$2b$10$mYbASzPTOv0inBQBPWJ9o.jl13bwFFFWyoIDgTOF5031ic9EJSIYK', 'Kevin Alejandro González Rivas', 'kevin@gmail.com', 'Guatemala, Guatemala', '2000-01-28', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `descuentos`
--
ALTER TABLE `descuentos`
  ADD PRIMARY KEY (`DescuentoID`);

--
-- Indices de la tabla `detallespedidos`
--
ALTER TABLE `detallespedidos`
  ADD PRIMARY KEY (`DetalleID`),
  ADD KEY `PedidoID` (`PedidoID`),
  ADD KEY `ProductoID` (`ProductoID`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`DetalleID`),
  ADD KEY `CompraID` (`CompraID`),
  ADD KEY `ProductoID` (`ProductoID`);

--
-- Indices de la tabla `encabezado_compras`
--
ALTER TABLE `encabezado_compras`
  ADD PRIMARY KEY (`CompraID`),
  ADD KEY `ProveedorID` (`ProveedorID`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`FacturaID`),
  ADD KEY `PedidoID` (`PedidoID`);

--
-- Indices de la tabla `inventariotienda`
--
ALTER TABLE `inventariotienda`
  ADD PRIMARY KEY (`InventarioID`),
  ADD KEY `ProductoID` (`ProductoID`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`PagoID`),
  ADD KEY `FacturaID` (`FacturaID`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`PedidoID`),
  ADD KEY `UsuarioID` (`UsuarioID`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ProductoID`),
  ADD KEY `TipoProductoID` (`TipoProductoID`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`ProveedorID`);

--
-- Indices de la tabla `tiposproducto`
--
ALTER TABLE `tiposproducto`
  ADD PRIMARY KEY (`TipoProductoID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `descuentos`
--
ALTER TABLE `descuentos`
  MODIFY `DescuentoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `detallespedidos`
--
ALTER TABLE `detallespedidos`
  MODIFY `DetalleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `DetalleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `inventariotienda`
--
ALTER TABLE `inventariotienda`
  MODIFY `InventarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ProductoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `ProveedorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tiposproducto`
--
ALTER TABLE `tiposproducto`
  MODIFY `TipoProductoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallespedidos`
--
ALTER TABLE `detallespedidos`
  ADD CONSTRAINT `detallespedidos_ibfk_1` FOREIGN KEY (`PedidoID`) REFERENCES `pedidos` (`PedidoID`),
  ADD CONSTRAINT `detallespedidos_ibfk_2` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ProductoID`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`CompraID`) REFERENCES `encabezado_compras` (`CompraID`),
  ADD CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ProductoID`);

--
-- Filtros para la tabla `encabezado_compras`
--
ALTER TABLE `encabezado_compras`
  ADD CONSTRAINT `encabezado_compras_ibfk_1` FOREIGN KEY (`ProveedorID`) REFERENCES `proveedores` (`ProveedorID`);

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`PedidoID`) REFERENCES `pedidos` (`PedidoID`);

--
-- Filtros para la tabla `inventariotienda`
--
ALTER TABLE `inventariotienda`
  ADD CONSTRAINT `inventariotienda_ibfk_1` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ProductoID`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`FacturaID`) REFERENCES `facturas` (`FacturaID`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`TipoProductoID`) REFERENCES `tiposproducto` (`TipoProductoID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
