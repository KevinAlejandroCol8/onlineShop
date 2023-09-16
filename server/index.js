const express = require("express");
const mysql = require("mysql");
const app = express();
const cors  = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usuarioscrud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    db.query('INSERT INTO empleados (nombre,edad,pais,cargo,anios) values (?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados;',
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send(result);
            }
        }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.idPrueba
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    db.query('UPDATE empleados SET nombre= ?,edad=?,pais=?,cargo=?,anios=? WHERE idPrueba = ?',[nombre,edad,pais,cargo,anios,id],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

app.delete("/elimiarEmpleado/:idPrueba",(req,res)=>{
    const idPrueba = req.params.idPrueba
    db.query('DELETE FROM empleados WHERE idPrueba = ?',[idPrueba],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send(result);
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
});