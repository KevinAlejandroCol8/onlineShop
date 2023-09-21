const express = require("express");
const app = express();
const cors  = require("cors");

const usuarios = require("./Router/Usuarios/usuarios");

// Configuración inicial
app.use(express.json());
app.use(cors());

// Middlewares
app.use('/usuarios', usuarios);


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
});