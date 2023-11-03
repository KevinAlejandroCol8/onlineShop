
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
    --ProveedorID INT,
    SKU  VARCHAR(120),
    FOREIGN KEY (TipoProductoID) REFERENCES TiposProducto(TipoProductoID)
    --FOREIGN KEY (ProveedorID) REFERENCES Proveedores(ProveedorID)
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

CREATE TABLE MovimientosInventario (
    MovimientoID INT PRIMARY KEY AUTO_INCREMENT,
    TipoMovimiento VARCHAR(80) NOT NULL,
    CantidadMovimiento INT NOT NULL,
    FechaMovimiento DATE NOT NULL
);