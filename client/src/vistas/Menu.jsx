import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/main_nav.css'

const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => { setIsOpen(!isOpen); }
  return (
    <>
      <div className="container-hero">
        <div className="container hero">
          <div className="customer-support">
            <svg className="fa-headset" xmlns="http://www.w3.org/2000/svg" height="3.40em" viewBox="0 0 512 512"><style></style><path d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"/></svg>
            <div className="content-customer-support">
              <span className="text">Atención al cliente</span>
              <span className="number">1234-5678</span>
            </div>
          </div>
          <div className="container-logo">
            <svg className="fa-mug-hot" xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 576 512"><style></style><path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/></svg>
            <h1 className="logo"><a onClick={() => navigate("/Home")}>AlejandroCol8</a></h1>
          </div>
          <div className="container-user">
            <svg className="fa-user" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style></style><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            <svg onClick={() => navigate("/")} class="fa-basket-shopping" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style></style><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            <div className="content-shopping-cart">
            <span className="text">Carrito</span>
              <span className="number">(0)</span>
            </div>
          </div>
        </div>
      </div><div className="container-navbar">
        <nav className="navbar container">
        <svg className="fa-bars" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style></style><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
          <ul className="menu">
            <li><a onClick={() => navigate("/Home")}>Inicio</a></li>
            <li><a onClick={() => navigate("/")} >Productos</a></li>
            <li><a>Descuentos</a></li>
            <li><a>Empleados</a></li>
            <li><a onClick={toggleMenu}>Mantenimientos</a></li>
                  <ul className={`submenu ${isOpen ? 'open' : ''}`}>
                    <li onClick={() => navigate("/descuentos")}><a>Catalogo Descuentos</a></li>
                    <li onClick={() => navigate("/tipoProductos")}><a>Catalogo Productos</a></li>
                    <li onClick={() => navigate("/ingresoProduct")}><a>Productos</a></li>
                    <li onClick={() => navigate("/EmpleadosList")}><a>Empleados</a></li>
                  </ul>
          </ul>
          <form className="search-form">
            <input type="search" placeholder="Buscar..." />
            <button className="btn-search">
              <svg className="fa-magnifying-glass" xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 512 512"><style></style><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            </button>
          </form>
        </nav>
      </div>
    </>
  );
}

export default Menu;