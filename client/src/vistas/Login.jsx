import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hoocks/AuthContext';

import '../css/NewLogin.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {

    const { login,codigo } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        NombreUsuario: "",
        Contrasenia: ""
    });

    const [loginMessage, setLoginMessage] = useState(""); // Para mostrar un mensaje de inicio de sesión

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/loginUsuario/login", formData);
            if (response.data.message === "Inicio de sesión exitoso") {
                const usuarioID = response.data.UsuarioID;
                // Resto de tu código
                // Llama a la función de inicio de sesión del contexto
                codigo(usuarioID);
                login(formData.NombreUsuario);
                navigate('/home');
            } else {
                setLoginMessage("Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setLoginMessage("Error al iniciar sesión");
        }
    };

    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/loginUsuario/login", formData);
            if (response.data.message === "Inicio de sesión exitoso") {
                const usuarioID = response.data.UsuarioID; // Obtiene el ID del usuario
                // Resto de tu código
                // Llama a la función de inicio de sesión del contexto
                login(formData.NombreUsuario, usuarioID);
                navigate('/home');
            } else {
                setLoginMessage("Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setLoginMessage("Error al iniciar sesión");
        }
    };

    */

    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={handleSubmit}>
                <h2 className="form-signin-heading">Please login</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="NombreUsuario"
                        placeholder="Nick name"
                        required
                        autoFocus
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        name="Contrasenia"
                        placeholder="Password"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text-center">
                    <div className="mb-2">
                        <button className="btn btn-lg btn-primary btn-wide" type="submit">Ingreso</button>
                    </div>
                    <div>
                        <button className="btn btn-lg btn-primary btn-wide" type="button" onClick={() => navigate("/LoginRegister")}>Registrarme</button>
                    </div>
                </div>
            </form>
            {loginMessage && <div className="alert alert-info">{loginMessage}</div>}
        </div>
    );
};

export default Login;
