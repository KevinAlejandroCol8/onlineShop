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
          </Routes>
      </main>
    </div>
  )

}
// <Route exact path="/" element={<Dashboard/>}/>
export default AppRouter