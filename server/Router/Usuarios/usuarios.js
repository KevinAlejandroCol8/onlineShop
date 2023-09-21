const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.post("/create",(req,res)=>{
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

router.get("/empleados",(req,res)=>{
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

router.put("/update",(req,res)=>{
    const idPrueba = req.body.idPrueba
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    db.query('UPDATE empleados SET nombre= ?,edad=?,pais=?,cargo=?,anios=? WHERE idPrueba = ?',[nombre,edad,pais,cargo,anios,idPrueba],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

router.delete("/elimiarEmpleado/:idPrueba",(req,res)=>{
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

module.exports = router;
