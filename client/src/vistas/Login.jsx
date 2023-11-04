import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../hoocks/AuthContext';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



import '../css/NewLogin.css'

const Login = () => {

    const MySwal = withReactContent(Swal);

    const { login, codigo } = useAuth();
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
                MySwal.fire({
                    title: <p>¡Bienvenido</p>,
                    html: <i>¡Bienvenido a nuestra tienda en linea</i>,
                    icon: 'success'
                });
                navigate('/home');
            } else {
                setLoginMessage("Error al iniciar sesión");
                MySwal.fire({
                    title: <p>Error</p>,
                    html: <i>Error al iniciar sesión</i>,
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            //setLoginMessage("Error al iniciar sesión");
            MySwal.fire({
                title: <p>Error</p>,
                html: <i>Error al iniciar sesión</i>,
                icon: 'error'
            });
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
        <div className="body-login">
            <div className="wrapper">
                <div class="form-container-login sign-in-container">
                <div class="form-login">
                    <form className="form-signin-login" onSubmit={handleSubmit}>
                        <h1>Iniciar Sesión</h1>
                        <input type="text"  name="NombreUsuario" placeholder="Nombre de usuario"
                            required autoFocus onChange={handleInputChange} />
                        <input type="password"  name="Contrasenia" placeholder="Contraseña" required
                            onChange={handleInputChange} />
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    </div>
                </div>
                <div class="overlay-container-login">
                    <div class="overlay-login">
                        <div class="overlay-panel-login overlay-right-login">
                            <h1>¡Bienvenido de nuevo!</h1>
                            <p>Ingresa tus datos para explorar las mejores ofertas del momento.</p>
                            <button class="ghost" id="signUp" onClick={() => navigate("/LoginRegister")}>Registrarse</button>
                        </div>
                    </div>
                </div>
                {/*loginMessage && <div className="alert alert-info">{loginMessage}</div> */}
            </div>
        </div>
    );
};

export default Login;
