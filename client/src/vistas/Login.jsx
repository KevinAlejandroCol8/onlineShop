import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hoocks/AuthContext';

import '../css/NewLogin.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        NombreUsuario: "",
        Contrasenia: ""
    });

    const [loginMessage, setLoginMessage] = useState(""); // Para mostrar un mensaje de inicio de sesión
    const [loggedInUser, setLoggedInUser] = useState(""); // Para mostrar el nombre del usuario logueado

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/loginUsuario/login", formData);
            // Maneja la respuesta del servidor aquí
            if (response.data === "Inicio de sesión exitoso") {
                setLoggedInUser(formData.NombreUsuario); // Guarda el nombre de usuario
                setLoginMessage(`Inicio de sesión exitoso para ${formData.NombreUsuario}`);
                localStorage.setItem('loggedUser', formData.NombreUsuario); 
                onLogin(formData.NombreUsuario);
                // Puedes redirigir al usuario a otra página aquí si es necesario
            } else {
                setLoginMessage("Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setLoginMessage("Error al iniciar sesión");
        }
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/loginUsuario/login", formData);
            if (response.data === "Inicio de sesión exitoso") {
                // Resto de tu código
                // Llama a la función de inicio de sesión del contexto
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
                        <button className="btn btn-lg btn-primary btn-wide" type="button">Registrarme</button>
                    </div>
                </div>
            </form>
            {loginMessage && <div className="alert alert-info">{loginMessage}</div>}
            {loggedInUser && <div className="alert alert-success">Usuario logueado: {loggedInUser}</div>}
        </div>
    );
};

export default Login;
