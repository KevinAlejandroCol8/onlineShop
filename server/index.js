const express = require("express");
const app = express();
const cors  = require("cors");

const usuarios = require("./Router/Usuarios/usuarios");
const tiposProductos = require("./Router/tiposProductos/tiposProductos");
const descuentos = require("./Router/Descuentos/descuentos");
const productos = require("./Router/Productos/productos");
const loginUsuarios = require("./Router/Login/creacionUsuarios");

// Configuración inicial
app.use(express.json());
app.use(cors());

// Middlewares
app.use('/usuarios', usuarios);
app.use('/tiposProductos', tiposProductos);
app.use('/descuentos', descuentos);
app.use('/productos', productos);
app.use('/loginUsuario', loginUsuarios);


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
});
