const Router = require("express");
const db  = require('../../configMySQL');
const bcrypt = require('bcrypt');
const router = Router();



/*router.post("/create",(req,res)=>{
    const NombreUsuario = req.body.NombreUsuario;
    const Contrasenia = req.body.Contrasenia;
    const NombreCompleto = req.body.NombreCompleto;
    const CorreoElectronico = req.body.CorreoElectronico;
    const FechaRegistro = req.body.FechaRegistro;
    const tipoRool = req.body.tipoRool;
    db.query('INSERT INTO Usuarios (NombreUsuario,Contrasenia,NombreCompleto,CorreoElectronico,FechaRegistro,Activo,tipoRool) values (?,?,?,?,?,?,?)',[NombreUsuario,Contrasenia,NombreCompleto,CorreoElectronico,FechaRegistro,1,tipoRool],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Creado");
            }
        }
    );
});*/

router.post("/create", (req, res) => {
    const NombreUsuario = req.body.NombreUsuario;
    const Contrasenia = req.body.Contrasenia; // Contraseña en texto plano

    // Genera un hash de la contraseña antes de guardarla en la base de datos
    bcrypt.hash(Contrasenia, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Error al generar el hash de la contraseña", err);
            res.status(500).send("Error al crear el usuario");
            return;
        }

        const NombreCompleto = req.body.NombreCompleto;
        const CorreoElectronico = req.body.CorreoElectronico;
        const FechaRegistro = req.body.FechaRegistro;
        const tipoRool = req.body.tipoRool;

        db.query('INSERT INTO Usuarios (NombreUsuario, Contrasenia, NombreCompleto, CorreoElectronico, FechaRegistro, Activo, tipoRool) values (?, ?, ?, ?, ?, ?, ?)', [NombreUsuario, hashedPassword, NombreCompleto, CorreoElectronico, FechaRegistro, 1, tipoRool],
            (err, result) => {
                if (err) {
                    console.log("El Error", err);
                    res.status(500).send("Error al crear el usuario");
                } else {
                    res.send("Creado");
                }
            }
        );
    });
});

router.post("/login", (req, res) => {
    const NombreUsuario = req.body.NombreUsuario;
    const Contrasenia = req.body.Contrasenia;
    // Busca el usuario por NombreUsuario
    db.query('SELECT * FROM Usuarios WHERE NombreUsuario = ?', [NombreUsuario], (err, results) => {
        if (err) {
            console.log("Error al buscar el usuario", err);
            res.status(500).send("Error al iniciar sesión");
            return;
        }
        if (results.length === 0) {
            // El usuario no existe
            res.status(401).send("Usuario no encontrado");
            return;
        }
        const user = results[0];
        // Compara la contraseña proporcionada con el hash almacenado en la base de datos
        bcrypt.compare(Contrasenia, user.Contrasenia, (err, passwordMatch) => {
            if (err) {
                console.log("Error al comparar contraseñas", err);
                res.status(500).send("Error al iniciar sesión");
                return;
            }
            if (!passwordMatch) {
                // Contraseña incorrecta
                res.status(401).send("Contraseña incorrecta");
                return;
            }
            // El inicio de sesión fue exitoso, puedes agregar lógica adicional aquí si es necesario
            res.send("Inicio de sesión exitoso");
        });
    });
});


router.get("/lista",(req,res)=>{
    db.query('SELECT * FROM Usuarios;',
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
    const UsuarioID = req.body.UsuarioID
    const NombreUsuario = req.body.NombreUsuario;
    const Contrasenia = req.body.Contrasenia;
    const NombreCompleto = req.body.NombreCompleto;
    const CorreoElectronico = req.body.CorreoElectronico;
    const FechaRegistro = req.body.FechaRegistro;
    db.query('UPDATE Usuarios SET NombreUsuario= ?,Contrasenia=?,NombreCompleto=?,CorreoElectronico=?,FechaRegistro=? WHERE UsuarioID = ?',[NombreUsuario,Contrasenia,NombreCompleto,CorreoElectronico,FechaRegistro,UsuarioID],
        (err,result) =>{
            if(err){
                console.log("El Error",err);
            }else{
                res.send("Actualizado");
            }
        }
    );
});

router.delete("/eliminar/:UsuarioID",(req,res)=>{
    const UsuarioID = req.params.UsuarioID
    db.query('DELETE FROM Usuarios WHERE UsuarioID = ?',[UsuarioID],
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
