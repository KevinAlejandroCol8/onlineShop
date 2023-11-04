const express = require("express");
const app = express();
const cors  = require("cors");

const usuarios = require("./Router/Usuarios/usuarios");
const tiposProductos = require("./Router/tiposProductos/tiposProductos");
const descuentos = require("./Router/Descuentos/descuentos");
const productos = require("./Router/Productos/productos");
const loginUsuarios = require("./Router/Login/creacionUsuarios");
const Proveedores = require("./Router/Proveedores/proveedor");
const CredencialesUser = require("./Router/Credenciales/Credenciales");
const Compras = require("./Router/Compras/Compras");
const Pedidos = require("./Router/Pedidos/Pedidos");
const InventarioTienda = require("./Router/Inventarios/Inventarios");


// Configuración inicial
app.use(express.json());
app.use(cors());

// Middlewares
app.use('/usuarios', usuarios);
app.use('/tiposProductos', tiposProductos);
app.use('/descuentos', descuentos);
app.use('/productos', productos);
app.use('/loginUsuario', loginUsuarios);
app.use('/Proveedores', Proveedores);
app.use('/Credenciales', CredencialesUser);
app.use('/Compras', Compras);
app.use('/Pedidos', Pedidos );
app.use('/Inventario', InventarioTienda );


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
});
