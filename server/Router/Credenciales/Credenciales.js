const Router = require("express");
const router = Router();
const db  = require('../../configMySQL')


router.get("/lista/:id", (req, res) => {
    const usuarioID = req.params.id;
    db.query('SELECT * FROM Usuarios WHERE UsuarioID = ?', [usuarioID], (err, result) => {
        if (err) {
            console.log("El Error", err);
            res.status(500).json({ error: "Hubo un error al buscar el usuario" });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: "Usuario no encontrado" });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
});




router.get("/lista",(req,res)=>{
    db.query('SELECT * FROM `usuarios` WHERE UsuarioID =1;',
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
