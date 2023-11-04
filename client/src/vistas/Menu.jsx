import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from '../hoocks/AuthContext';
import { useCarrito } from "../hoocks/carritoState";

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/main_nav.css'

import { tiendaIco, buscador, userIcon, IconoTienda, IconoAtencion } from "../hoocks/iconos";

const Menu = () => {
  const { loggedInUser, logout,codigoUser } = useAuth();


  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => { setIsOpen(!isOpen); };

  /*carrito */

  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { carrito, eliminarDelCarrito } = useCarrito();

  const procederALaCompra = () => {
    toggleCarrito();
    navigate("/Carrito", { state: { carrito } });
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const cantidadProductosEnCarrito = carrito.length;

  const quitarProductoDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((producto) => {
       return Number(producto.ProductoID) !== Number(productoId);
    });
    eliminarDelCarrito(nuevoCarrito);
  };


  /* */

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
              <span className="text textoLinea">Atención al cliente</span>
              <span className="number textoLinea">1234-5678</span>
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
                <span className="user-welcome">{loggedInUser}-{codigoUser}</span>
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
              onClick={toggleCarrito}
              class="fa-basket-shopping"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            ><path d={tiendaIco} /></svg>
            <div className="content-shopping-cart">
              <span className="text textoLinea" onClick={toggleCarrito}>Carrito</span>
              <span className="number textoNumero" onClick={toggleCarrito}>{cantidadProductosEnCarrito}</span>
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
            <li><a onClick={() => navigate("/Compras")}>Compras</a></li>
            <li><a onClick={() => navigate("/Proveedores")}>Proveedores</a></li>
            <li><a onClick={toggleMenu}>Mantenimientos</a></li>
            <ul className={`submenu ${isOpen ? "open" : ""}`}>
              <li onClick={() => navigate("/descuentos")}><a>Catalogo Descuentos</a></li>
              <li onClick={() => navigate("/tipoProductos")}><a>Catalogo Productos</a></li>
              <li onClick={() => navigate("/ingresoProduct")}><a>Productos</a></li>
              <li onClick={() => navigate("/EmpleadosList")}><a>Empleados</a></li>
            </ul>
          </ul>
          {/* 
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
          */}
        </nav>
      </div>
      <div className={`carrito-container ${mostrarCarrito ? 'mostrar' : ''}`}>
        <div className="carrito">
          <div class="col checkout__summary">
            <div class="h3 mb-3">Resumen de orden</div>
            {carrito.map((producto,index) => (
              <div class="card p-3 shadow rounded-3">
                <div class="row align-items-center mb-4">
                  <div class="col-4">
                    <div class="rounded-3 overflow-hidden">
                      <img src={`http://localhost:3001/productos/imagen/${producto.Imagen}`} width="100%" alt="Producto" />
                    </div>
                  </div>
                  <div class="col">
                    <div class="nombreProducto h6 mb-1">{producto.NombreProducto}</div>
                    <div class="descripcionProducto text-muted small mb-1">{producto.DescripcionProducto}</div>
                    <div class="montoProducto h5 mb-0"> Q. {producto.PrecioVenta}</div>
                    {/* 
                    <button className="btn btn-danger" onClick={() => quitarProductoDelCarrito(producto.ProductoID)}>
                      Quitar del carrito
                    </button>
                    */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="classBtn first info-product" onClick={procederALaCompra}>Proceder a la Compra</button>
        </div>
      </div>
    </>
  );
}

export default Menu;
