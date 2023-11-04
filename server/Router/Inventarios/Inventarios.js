const Router = require("express");
const router = Router();
const db  = require('../../configMySQL');


router.get("/listProduct",(req,res)=>{
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



module.exports = router;
