import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from '../hoocks/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/main_nav.css'

import { tiendaIco, buscador, userIcon, IconoTienda, IconoAtencion } from "../hoocks/iconos";

const Menu = () => {
  const { loggedInUser, logout } = useAuth();


  /*const handleLogout = () => {
    // Redirige al usuario a la página de inicio de sesión o a donde desees
    navigate("/Login");
  }*/

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => { setIsOpen(!isOpen); };

  return (
    <>
      <div className="container-hero">
        <div className="container hero">
          <div className="customer-support">
            <svg
              className="fa-headset"
              xmlns="http://www.w3.org/2000/svg"
              height="3.40em"
              viewBox="0 0 512 512"
            ><path d={IconoAtencion} />
            </svg>
            <div className="content-customer-support">
              <span className="text">Atención al cliente</span>
              <span className="number">1234-5678</span>
            </div>
          </div>
          <div className="container-logo">
            <svg
              className="fa-mug-hot"
              xmlns="http://www.w3.org/2000/svg"
              height="4em"
              viewBox="0 0 576 512"
            ><path d={IconoTienda} /></svg>
            <h1 className="logo">
              <a onClick={() => navigate("/Home")}>AlejandroCol8</a>
            </h1>
          </div>
          <div className="container-user">
            {loggedInUser ? (
              <div>
                <svg
                  className="fa-user"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                ><path d={userIcon} /></svg>
                <span className="user-welcome">{loggedInUser}</span>
                <button onClick={logout} className="btn btn-logout">Cerrar Sesión</button>
              </div>
            ) : (
              <svg
                onClick={() => navigate("/Login")}
                className="fa-user"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              ><path d={userIcon} /></svg>
            )}
            <svg
              onClick={() => navigate("/")}
              class="fa-basket-shopping"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            ><path d={tiendaIco} /></svg>
            <div className="content-shopping-cart">
              <span className="text">Carrito</span>
              <span className="number">(0)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-navbar">
        <nav className="navbar container">
          <svg
            className="fa-bars"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          ></svg>
          <ul className="menu">
            <li><a onClick={() => navigate("/Home")}>Inicio</a></li>
            <li><a onClick={() => navigate("/")}>Productos</a></li>
            <li><a>Descuentos</a></li>
            <li><a>Empleados</a></li>
            <li><a onClick={toggleMenu}>Mantenimientos</a></li>
            <ul className={`submenu ${isOpen ? "open" : ""}`}>
              <li onClick={() => navigate("/descuentos")}><a>Catalogo Descuentos</a></li>
              <li onClick={() => navigate("/tipoProductos")}><a>Catalogo Productos</a></li>
              <li onClick={() => navigate("/ingresoProduct")}><a>Productos</a></li>
              <li onClick={() => navigate("/EmpleadosList")}><a>Empleados</a></li>
            </ul>
          </ul>
          <form className="search-form">
            <input type="search" placeholder="Buscar..." />
            <button className="btn-search">
              <svg
                className="fa-magnifying-glass"
                xmlns="http://www.w3.org/2000/svg"
                height="1.8em"
                viewBox="0 0 512 512"
              ><path d={buscador} /></svg>
            </button>
          </form>
        </nav>
      </div>
    </>
  );
}

export default Menu;