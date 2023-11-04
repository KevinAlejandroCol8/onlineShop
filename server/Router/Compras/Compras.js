const Router = require("express");
const router = Router();
const db  = require('../../configMySQL');


router.post("/create",(req,res)=>{
    const CompraID = req.body.CompraID;
    const MontoCompra = req.body.MontoCompra;
    const CantidadTotal = req.body.CantidadTotal;
    const ProveedorID = req.body.ProveedorID;

    db.query('INSERT INTO encabezado_compras (CompraID,MontoCompra,CantidadTotal,ProveedorID) values (?,?,?,?)',[CompraID,MontoCompra,CantidadTotal,ProveedorID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});



router.post("/createDetalle",(req,res)=>{
    const Cantidad = req.body.Cantidad;
    const ProductoID = req.body.ProductoID;
    const CompraID = req.body.CompraID;
    const CostoAdquisicion = req.body.CostoAdquisicion;
    db.query('INSERT INTO Detalle_Compra (Cantidad,CostoAdquisicion,ProductoID,CompraID) values (?,?,?,?)',[Cantidad,CostoAdquisicion,ProductoID,CompraID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});


router.post("/createInventario",(req,res)=>{
    const Cantidad = req.body.Cantidad;
    const ProductoID = req.body.ProductoID;
    db.query('INSERT INTO InventarioTienda (Cantidad,ProductoID) values (?,?)',[Cantidad,ProductoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});


router.get("/producto-cantidad/:ProductoID",(req,res)=>{
    const ProductoID = req.params.ProductoID
    db.query('SELECT CantidadDisponible FROM Productos WHERE ProductoID = ?;',[ProductoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send(result);
            }
        }
    );
});


router.get("/encabezados",(req,res)=>{
    db.query('SELECT * FROM Encabezado_Compras;',
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send(result);
            }
        }
    );
});

router.get("/detallesCP",(req,res)=>{
    db.query('SELECT * FROM Detalle_Compra;',
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send(result);
            }
        }
    );
});


router.get("/Detalles/:CompraID",(req,res)=>{
    const CompraID = req.params.CompraID
    db.query('SELECT * FROM Detalle_Compra WHERE CompraID = ?;',[CompraID],
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
