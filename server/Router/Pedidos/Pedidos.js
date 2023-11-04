const Router = require("express");
const router = Router();
const db  = require('../../configMySQL');


router.post("/createPedido",(req,res)=>{
    const PedidoID = req.body.PedidoID;
    const UsuarioID = req.body.UsuarioID;
    const TotalPedido = req.body.TotalPedido;
    db.query('INSERT INTO Pedidos (PedidoID,UsuarioID,TotalPedido) values (?,?,?)',[PedidoID,UsuarioID,TotalPedido],
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
    const PedidoID = req.body.PedidoID;
    const ProductoID = req.body.ProductoID;
    const CantidadProducto = req.body.CantidadProducto;
    const PrecioUnitario = req.body.PrecioUnitario;
    db.query('INSERT INTO DetallesPedidos (PedidoID,ProductoID,CantidadProducto,PrecioUnitario) values (?,?,?,?)',[PedidoID,ProductoID,CantidadProducto,PrecioUnitario],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});

module.exports = router;

