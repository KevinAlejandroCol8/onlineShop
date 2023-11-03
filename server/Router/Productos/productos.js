const multer = require("multer");
const path = require("path");
const Router = require("express");
const router = Router();
const fs = require("fs");
const db  = require('../../configMySQL')


// Configura multer para manejar la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Asigna un nombre único a la imagen
    },
});
  
const upload = multer({ storage });

// Ruta para crear productos con carga de imágenes
router.post("/create", upload.single("Imagen"), (req, res) => {
    const NombreProducto = req.body.NombreProducto;
    const DescripcionProducto = req.body.DescripcionProducto;
    const PrecioVenta = req.body.PrecioVenta;
    const CostoAdquisicion = req.body.CostoAdquisicion;
    //const CantidadDisponible = req.body.CantidadDisponible;
    const Imagen = req.file ? req.file.filename : null; // Nombre del archivo subido
    const SKU = req.body.SKU;
    /* Referecnias llaves foraneas*/
    /*const ProveedorID = req.body.ProveedorID;*/
    const TipoProductoID = req.body.TipoProductoID;
    /* Fin de las llaves foraneas */
    db.query(
      'INSERT INTO Productos (NombreProducto, DescripcionProducto, PrecioVenta, CostoAdquisicion,SKU, Imagen, TipoProductoID) VALUES (?,?,?,?,?,?,?)',
      [NombreProducto, DescripcionProducto, PrecioVenta, CostoAdquisicion,SKU, Imagen, TipoProductoID],
      (err, result) => {
        if (err) {
          console.log("El Error", err);
        } else {
          res.send("Registro creado");
        }
      }
    );
  });


router.get("/imagen/:nombreImagen", (req, res) => {
    const nombreImagen = req.params.nombreImagen;
    const rutaImagen = path.join(__dirname, "../../images", nombreImagen); // Ruta completa de la imagen

    // Verifica si el archivo de imagen existe
    if (fs.existsSync(rutaImagen)) {
        // Si existe, envía la imagen como respuesta
        res.sendFile(rutaImagen);
    } else {
        // Si no existe, envía una respuesta de error junto con la ruta buscada
        const mensajeError = `Imagen no encontrada. Ruta buscada: ${rutaImagen}`;
        res.status(404).send(mensajeError);
    }
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
