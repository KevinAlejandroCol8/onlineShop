const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.post("/create",(req,res)=>{
    const NombreProducto = req.body.NombreProducto;
    const DescripcionProducto = req.body.DescripcionProducto;
    const PrecioVenta = req.body.PrecioVenta;
    const CostoAdquisicion = req.body.CostoAdquisicion;
    const CantidadDisponible = req.body.CantidadDisponible;
    const Imagen = req.body.Imagen;
    const DescuentoID = req.body.DescuentoID;
    const TipoProductoID = req.body.TipoProductoID;
    db.query('INSERT INTO Productos (NombreProducto,DescripcionProducto,PrecioVenta,CostoAdquisicion,CantidadDisponible,Imagen,DescuentoID,TipoProductoID) values (?,?,?,?,?,?,?,?)'
        ,[NombreProducto,DescripcionProducto,PrecioVenta,CostoAdquisicion,CantidadDisponible,Imagen,DescuentoID,TipoProductoID],
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
    db.query('SELECT * FROM Productos;',
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
    const ProductoID = req.body.ProductoID
    const NombreProducto = req.body.NombreProducto;
    const DescripcionProducto = req.body.DescripcionProducto;
    const PrecioVenta = req.body.PrecioVenta;
    const CostoAdquisicion = req.body.CostoAdquisicion;
    const CantidadDisponible = req.body.CantidadDisponible;
    const Imagen = req.body.Imagen;
    const DescuentoID = req.body.DescuentoID;
    const TipoProductoID = req.body.TipoProductoID;
    db.query('UPDATE Productos SET NombreProducto= ?,DescripcionProducto = ?, PrecioVenta=?,CostoAdquisicion=?,CantidadDisponible=?,Imagen=?,DescuentoID=?,TipoProductoID=? WHERE ProductoID = ?'
    ,[NombreProducto,DescripcionProducto,PrecioVenta,CostoAdquisicion,CantidadDisponible,Imagen,DescuentoID,TipoProductoID,ProductoID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

router.delete("/eliminar/:ProductoID",(req,res)=>{
    const ProductoID = req.params.ProductoID
    db.query('DELETE FROM Productos WHERE ProductoID = ?',[ProductoID],
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
