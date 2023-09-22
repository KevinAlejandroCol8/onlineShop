const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.post("/create",(req,res)=>{
    const NombreDescuento = req.body.NombreDescuento;
    const PorcentajeDescuento = req.body.PorcentajeDescuento;
    db.query('INSERT INTO Descuentos (NombreDescuento,PorcentajeDescuento) values (?,?)',[NombreDescuento,PorcentajeDescuento],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Registro creado");
            }
        }
    );
});

router.get("/lista",(req,res)=>{
    db.query('SELECT * FROM Descuentos;',
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
    const DescuentoID = req.body.DescuentoID
    const NombreDescuento = req.body.NombreDescuento;
    const PorcentajeDescuento = req.body.PorcentajeDescuento;
    db.query('UPDATE Descuentos SET NombreDescuento= ?,PorcentajeDescuento = ? WHERE DescuentoID = ?',[NombreDescuento,PorcentajeDescuento,DescuentoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

router.delete("/eliminar/:DescuentoID",(req,res)=>{
    const DescuentoID = req.params.DescuentoID
    db.query('DELETE FROM Descuentos WHERE DescuentoID = ?',[DescuentoID],
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
