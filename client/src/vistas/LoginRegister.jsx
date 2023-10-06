import React from "react";
import { useState } from "react"
import axios from "axios"

import '../css/RegisterLogin.css'
import '../css/carrito.css'

const LoginRegister = () => {

    /*Cmapos de la base de datos*/
    const [NombreUsuario, setNombreUsuario] = useState("");
    const [Contrasenia, setContrasenia] = useState("");
    const [NombreCompleto, setNombreCompleto] = useState("");
    const [CorreoElectronico, setCorreoElectronico] = useState("");
    const [FechaRegistro, setFechaRegistro] = useState("");
    const [tipoRool, setTipoRool] = useState("");

    const add = () => {
        axios.post("http://localhost:3001/loginUsuario/create", {
            NombreUsuario: NombreUsuario,
            Contrasenia: Contrasenia,
            NombreCompleto: NombreCompleto,
            CorreoElectronico: CorreoElectronico,
            FechaRegistro: FechaRegistro,
            tipoRool : tipoRool
        }).then(() => {
          limpiar();
          alert("Registro Guardar");
        })
    }

    const limpiar = () =>{
        setNombreUsuario("");
        setContrasenia("");
        setNombreCompleto("");
        setCorreoElectronico("");
        setFechaRegistro("");
        setTipoRool("");
    }

    return (
        <div className="inicio">
            <div className="container_register">
                <h1>Registro Usuario</h1>
                <div className="mb-3">
                    <label className="titulos">Nombre Completo</label>
                    <input 
                        onChange={(event) => {
                            setNombreCompleto(event.target.value);
                        }}
                        value={NombreCompleto} type="text" className="form-control custom-input" id="nombre" placeholder="Nombre Completo" />
                </div>
                <div className="mb-3">
                    <label className="titulos">Email</label>
                    <input 
                        onChange={(event) => {
                            setCorreoElectronico(event.target.value);
                        }}
                        value={CorreoElectronico} type="email" className="form-control custom-input" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label className="titulos">Fecha Nacimiento</label>
                    <input 
                        onChange={(event) => {
                            setFechaRegistro(event.target.value);
                        }}
                        value={FechaRegistro} type="date" className="form-control custom-input" id="fecha" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label className="titulos">NickName</label>
                    <input 
                        onChange={(event) => {
                            setNombreUsuario(event.target.value);
                        }}
                        value={NombreUsuario} type="text" className="form-control custom-input" id="nickname" placeholder="Nika Name" />
                </div>
                <div className="mb-3">
                    <label className="titulos">Password</label>
                    <input 
                        onChange={(event) => {
                            setContrasenia(event.target.value);
                        }}
                        value={Contrasenia} type="password" className="form-control custom-input" id="password" placeholder="Password" />
                </div>
                <div className="mb-3 d-flex justify-content-center"> {/* Utilizamos "d-flex" para activar flexbox */}
                    <button className="classBtn first" onClick={add} >Guardar</button>
                </div>
            </div>
        </div>

    );
};

export default LoginRegister;
