
-- Tabla de Productos
CREATE DATABASE db_onlyshop;

USE DATABASE db_onlyshop;

CREATE TABLE TiposProducto (
    TipoProductoID INT PRIMARY KEY AUTO_INCREMENT,
    NombreTipoProducto VARCHAR(50) NOT NULL
);

CREATE TABLE Descuentos (
    DescuentoID INT PRIMARY KEY AUTO_INCREMENT,
    NombreDescuento VARCHAR(50) NOT NULL,
    PorcentajeDescuento DECIMAL(5, 2) NOT NULL
);


CREATE TABLE Productos (
    ProductoID INT PRIMARY KEY AUTO_INCREMENT,
    NombreProducto VARCHAR(255) NOT NULL,
    DescripcionProducto TEXT,
    PrecioVenta DECIMAL(10, 2),
    CostoAdquisicion DECIMAL(10, 2),
    CantidadDisponible INT,
    Imagen VARCHAR(255),
    DescuentoID INT,
    TipoProductoID INT,
    SKU  VARCHAR(120) -- Clave foránea para relacionar con TiposProducto
    FOREIGN KEY (TipoProductoID) REFERENCES TiposProducto(TipoProductoID),
    FOREIGN KEY (DescuentoID) REFERENCES Descuentos(DescuentoID)
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    ClienteID INT PRIMARY KEY,
    NombreCliente VARCHAR(255),
    Direccion VARCHAR(255),
    InformacionContacto VARCHAR(255) -- Puede ser VARCHAR o TEXT según necesidades
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    PedidoID INT PRIMARY KEY,
    ClienteID INT,
    FechaPedido DATE,
    EstadoPedido VARCHAR(50), -- Puedes definir la longitud adecuada
    TotalPedido DECIMAL(10, 2),
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
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
    InformacionCliente VARCHAR(255), -- Puede ser VARCHAR o TEXT según necesidades
    TotalFactura DECIMAL(10, 2),
    FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID)
);

-- Tabla de Pagos
CREATE TABLE Pagos (
    PagoID INT PRIMARY KEY,
    FacturaID INT,
    FechaPago DATE,
    MetodoPago VARCHAR(50), -- Puedes definir la longitud adecuada
    MontoPago DECIMAL(10, 2),
    FOREIGN KEY (FacturaID) REFERENCES Facturas(FacturaID)
);

CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY AUTO_INCREMENT,
    NombreUsuario VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    NombreCompleto VARCHAR(100),
    CorreoElectronico VARCHAR(100),
    FechaRegistro DATE,
    Activo BOOLEAN DEFAULT TRUE,
    tipoRool INT
);

CREATE TABLE MovimientosInventario (
    MovimientoID INT PRIMARY KEY AUTO_INCREMENT,
    ProductoID INT, -- Clave foránea para relacionar con Productos
    TipoMovimiento ENUM('Entrada', 'Salida') NOT NULL,
    CantidadMovimiento INT NOT NULL,
    FechaMovimiento DATE NOT NULL,
    DescripcionMovimiento TEXT,
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);