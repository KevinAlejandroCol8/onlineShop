const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.post("/create",(req,res)=>{
    const NombreProveedor = req.body.NombreProveedor;
    const Direccion = req.body.Direccion;
    const InformacionContacto = req.body.InformacionContacto;
    const Telefono = req.body.Telefono;
    const CorreoElectronico = req.body.CorreoElectronico;
    const SitioWeb = req.body.SitioWeb;
    const TipoProductoServicio = req.body.TipoProductoServicio;
    const FechaInicioRelacion = req.body.FechaInicioRelacion;
    const NotasComentarios = req.body.NotasComentarios;
    const EstadoRelacion= 'activo';
    db.query(`INSERT INTO Proveedores (
                NombreProveedor,
                Direccion,
                InformacionContacto,
                Telefono,
                CorreoElectronico,
                SitioWeb,
                TipoProductoServicio,
                FechaInicioRelacion,
                NotasComentarios,
                EstadoRelacion
            ) values (?,?,?,?,?,?,?,?,?,?)`,
            [NombreProveedor,Direccion,InformacionContacto,Telefono,CorreoElectronico,SitioWeb,
            TipoProductoServicio,FechaInicioRelacion,NotasComentarios,EstadoRelacion],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});

router.get("/lista",(req,res)=>{
    db.query('SELECT * FROM Proveedores;',
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
    const ProveedorID = req.body.ProveedorID
    const NombreProveedor = req.body.NombreProveedor;
    const Direccion = req.body.Direccion;
    const InformacionContacto = req.body.InformacionContacto;
    const Telefono = req.body.Telefono;
    const CorreoElectronico = req.body.CorreoElectronico;
    const SitioWeb = req.body.SitioWeb;
    const TipoProductoServicio = req.body.TipoProductoServicio;
    const FechaInicioRelacion = req.body.FechaInicioRelacion;
    const NotasComentarios = req.body.NotasComentarios;
    const EstadoRelacion= 'Activo';
    db.query(`UPDATE Proveedores SET NombreProveedor= ?,Direccion=?,InformacionContacto=?,Telefono=?,CorreoElectronico=?,
                SitioWeb=?,TipoProductoServicio=?,FechaInicioRelacion=?,NotasComentarios=?,EstadoRelacion=?
            WHERE ProveedorID = ?`,
            [NombreProveedor,Direccion,InformacionContacto,Telefono,CorreoElectronico,
            SitioWeb,TipoProductoServicio,FechaInicioRelacion,NotasComentarios,EstadoRelacion,ProveedorID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

router.delete("/elimiar/:ProveedorID",(req,res)=>{
    const ProveedorID = req.params.ProveedorID
    db.query('DELETE FROM Proveedores WHERE ProveedorID = ?',[ProveedorID],
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
