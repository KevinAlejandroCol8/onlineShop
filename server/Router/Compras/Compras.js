const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.post("/create-encabezado",(req,res)=>{
    const CompraID = req.body.CompraID;
    const fechaCompra = req.body.fechaCompra;
    const MontoCompra = req.body.MontoCompra;
    const CantidadTotal = req.body.CantidadTotal;
    const ProveedorID = req.body.ProveedorID;
    db.query('INSERT INTO Encabezado_Compras (CompraID,fechaCompra,MontoCompra,CantidadTotal,ProveedorID) values (?,?,?,?,?)',
                                    [CompraID,fechaCompra,MontoCompra,CantidadTotal,ProveedorID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});

router.post("/create-detalle",(req,res)=>{
    const Cantidad = req.body.Cantidad;
    const ProductoID = req.body.ProductoID;
    const CompraID = req.body.CompraID;
    db.query('INSERT INTO Detalle_Compra (Cantidad,ProductoID,CompraID) values (?,?,?)',
                                    [Cantidad,ProductoID,CompraID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});

router.post("/create-inventario",(req,res)=>{
    const Cantidad = req.body.Cantidad;
    const ProductoID = req.body.ProductoID;
    db.query('INSERT INTO InventarioTienda (Cantidad,ProductoID) values (?,?)',
                                    [Cantidad,ProductoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});


router.put("/update",(req,res)=>{
    const ProductoID = req.body.ProductoID
    const PrecioVenta = req.body.PrecioVenta;
    const CantidadDisponible = req.body.CantidadDisponible;
    db.query('UPDATE Productos SET  PrecioVenta=?,CantidadDisponible=? WHERE ProductoID = ?'
    ,[PrecioVenta,CantidadDisponible,ProductoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
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


module.exports = router;
