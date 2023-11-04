import React from "react";
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/RegisterLogin.css'


const LoginRegister = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
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
            tipoRool: tipoRool
        }).then(() => {
            limpiar();
            MySwal.fire({
                title: <p>Bienvenido</p>,
                html: <i>Es un gusto tenerte con nosotros</i>,
                icon: 'success'
              });
        })
    }

    const limpiar = () => {
        setNombreUsuario("");
        setContrasenia("");
        setNombreCompleto("");
        setCorreoElectronico("");
        setFechaRegistro("");
        setTipoRool("");
    }

    return (
        <div className="body-login">
            <div className="wrapper">
                <div class="form-container-login sign-in-container">
                    <div class="form-login">
                        <h1>Registro Usuario</h1>
                        <form className="form-signin-login">
                            <input
                                onChange={(event) => {
                                    setNombreCompleto(event.target.value);
                                }}
                                value={NombreCompleto} type="text"  id="nombre" placeholder="Nombre Completo" />
                            <input
                                onChange={(event) => {
                                    setCorreoElectronico(event.target.value);
                                }}
                                value={CorreoElectronico} type="email"  id="email" placeholder="nombre@institucion.com" />
                            <input
                                onChange={(event) => {
                                    setFechaRegistro(event.target.value);
                                }}
                                value={FechaRegistro} type="date"  id="fecha" />
                            <input
                                onChange={(event) => {
                                    setNombreUsuario(event.target.value);
                                }}
                                value={NombreUsuario} type="text"  id="nickname" placeholder="Nombre de Usuario" />
                            <input
                                onChange={(event) => {
                                    setContrasenia(event.target.value);
                                }}
                                value={Contrasenia} type="password" id="password" placeholder="Contraseña" />
                            <button class="ghost"  onClick={add} >Guardar</button>
                        </form>
                    </div>
                </div>
                <div class="overlay-container-login">
                    <div class="overlay-login">
                        <div class="overlay-panel-login overlay-right-login">
                            <h1>¡Bienvenido!</h1>
                            <p>Ingresa tus datos para registrarse.</p>
                            <button id="signUp" onClick={() => navigate("/Login")}>Iniciar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
