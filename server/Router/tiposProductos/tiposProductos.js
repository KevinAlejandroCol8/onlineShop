const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.post("/create",(req,res)=>{
    const NombreTipoProducto = req.body.NombreTipoProducto;
    db.query('INSERT INTO TiposProducto (NombreTipoProducto) values (?)',[NombreTipoProducto],
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
    db.query('SELECT * FROM TiposProducto;',
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
    const TipoProductoID = req.body.TipoProductoID
    const NombreTipoProducto = req.body.NombreTipoProducto;
    db.query('UPDATE TiposProducto SET NombreTipoProducto= ? WHERE TipoProductoID = ?',[NombreTipoProducto,TipoProductoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

router.delete("/eliminar/:TipoProductoID",(req,res)=>{
    const TipoProductoID = req.params.TipoProductoID
    db.query('DELETE FROM TiposProducto WHERE TipoProductoID = ?',[TipoProductoID],
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
