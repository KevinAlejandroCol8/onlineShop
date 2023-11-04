import { Route, Routes } from "react-router-dom";
import React from 'react';


//import Sidebar from "../scenes/global/Sidebar";
//import Sidebar2 from "../scenes/global/Sidebar2";
import Menu from "./vistas/Menu";
import Dashboard from "./vistas/Dashboard";
import EmpleadosList from "./vistas/EmpleadosList";
import CatalogoProductos from "./vistas/CatalogoProductos";
import Descuentos from "./vistas/Descuentos";
import IngresoProducto from "./vistas/IngresoProducto";
import Home from "./vistas/Home"
//import Footer from "./vistas/Footer"
import Carrito from "./vistas/Carrito"
import Productos from "./vistas/Productos";
import Login from "./vistas/Login";
import LoginRegister from "./vistas/LoginRegister";
import Payment from "./vistas/Payment";
import Facturacion from "./vistas/Facturacion";
import Proveedores from "./vistas/Proveedores";
import Compras from "./vistas/Compras";

function AppRouter(){
  return(
    
    <div className="app">
      <Menu />
      <main className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route exact path="/EmpleadosList" element={<EmpleadosList/>}/>
            <Route exact path="/tipoProductos" element={<CatalogoProductos/>}/>
            <Route exact path="/descuentos" element={<Descuentos/>}/>
            <Route exact path="/ingresoProduct" element={<IngresoProducto/>}/>
            <Route exact path="/Home" element={<Home/>}/>
            <Route exact path="/Carrito" element={<Carrito/>}/>
            <Route exact path="/Productos" element={<Productos/>}/>
            <Route exact path="/Login" element={<Login/>}/>
            <Route exact path="/LoginRegister" element={<LoginRegister/>}/>
            <Route exact path="/Payment" element={<Payment/>}/>
            <Route exact path="/Facturacion" element={<Facturacion/>}/>
            <Route exact path="/Proveedores" element={<Proveedores/>}/>
            <Route exact path="/Compras" element={<Compras/>}/>
          </Routes>
      </main>
      {/*<Footer/>*/}
    </div>
  )
}
export default AppRouter