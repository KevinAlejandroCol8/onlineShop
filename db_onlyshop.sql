
-- Tabla de Productos
CREATE DATABASE db_onlyshop;

USE DATABASE db_onlyshop;

CREATE TABLE TiposProducto (
    TipoProductoID INT PRIMARY KEY AUTO_INCREMENT,
    NombreTipoProducto VARCHAR(50) NOT NULL
);

-- Tabla Descuentos --Modificada
CREATE TABLE Descuentos (
    DescuentoID INT PRIMARY KEY AUTO_INCREMENT,
    NombreDescuento VARCHAR(50) NOT NULL,
    Codigo_Descuento VARCHAR(50),
    PorcentajeDescuento DECIMAL(5, 2) NOT NULL
);

-- Tabla de Proveedores --Modificada
CREATE TABLE Proveedores (
    ProveedorID INT PRIMARY KEY AUTO_INCREMENT,
    NombreProveedor VARCHAR(255),
    Direccion VARCHAR(255),
    InformacionContacto VARCHAR(255),
    Telefono VARCHAR(20),
    CorreoElectronico VARCHAR(255),
    SitioWeb VARCHAR(255),
    TipoProductoServicio VARCHAR(100),
    FechaInicioRelacion DATE,
    NotasComentarios TEXT,
    CategoriaProveedor VARCHAR(100),
    EstadoRelacion VARCHAR(20)
);

--Tabla de Productos --Modificada
CREATE TABLE Productos (
    ProductoID INT PRIMARY KEY AUTO_INCREMENT,
    NombreProducto VARCHAR(255) NOT NULL,
    DescripcionProducto TEXT,
    PrecioVenta DECIMAL(10, 2),
    CostoAdquisicion DECIMAL(10, 2),
    CantidadDisponible INT,
    Imagen VARCHAR(255),
    TipoProductoID INT,
    SKU  VARCHAR(120),
    FOREIGN KEY (TipoProductoID) REFERENCES TiposProducto(TipoProductoID)
);

--Tabla Usuarios
CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY AUTO_INCREMENT,
    NombreUsuario VARCHAR(50) NOT NULL,
    Contrasenia VARCHAR(255) NOT NULL,
    NombreCompleto VARCHAR(100),
    CorreoElectronico VARCHAR(100),
    Direccion VARCHAR(255),
    FechaRegistro DATE,
    Activo BOOLEAN DEFAULT TRUE,
    tipoRool INT
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    PedidoID INT PRIMARY KEY,
    UsuarioID INT,
    FechaPedido DATE,
    EstadoPedido VARCHAR(50), 
    TotalPedido DECIMAL(10, 2),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Detalles de Pedidos
CREATE TABLE DetallesPedidos (
    DetalleID INT PRIMARY KEY,
    PedidoID INT,
    ProductoID INT,
    CantidadProducto INT,
    PrecioUnitario DECIMAL(10, 2),
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);

-- Tabla de Facturas
CREATE TABLE Facturas (
    FacturaID INT PRIMARY KEY,
    PedidoID INT,
    FechaFactura DATE,
    InformacionCliente VARCHAR(255),
    TotalFactura DECIMAL(10, 2),
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID)
);

-- Tabla de Pagos
CREATE TABLE Pagos (
    PagoID INT PRIMARY KEY,
    FacturaID INT,
    FechaPago DATE,
    MetodoPago VARCHAR(50),
    MontoPago DECIMAL(10, 2),
    FOREIGN KEY (FacturaID) REFERENCES Facturas(FacturaID)
);


CREATE TABLE Encabezado_Compras(
    CompraID INT PRIMARY KEY,
    fechaCompra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MontoCompra DECIMAL(10, 2),
    CantidadTotal INT,
    ProveedorID INT,
    FOREIGN KEY (ProveedorID) REFERENCES Proveedores(ProveedorID)
);

CREATE TABLE Detalle_Compra(
    DetalleID INT PRIMARY KEY AUTO_INCREMENT, 
    Cantidad INT,
    PrecioCompra DECIMAL(10, 2),
    ProductoID INT,
    CompraID INT,
    FOREIGN KEY (CompraID) REFERENCES Encabezado_Compras(CompraID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);


CREATE TABLE InventarioTienda(
    InventarioID INT PRIMARY KEY AUTO_INCREMENT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Cantidad INT,
    ProductosID INT
);


