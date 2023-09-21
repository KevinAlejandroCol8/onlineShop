import { Route, Routes } from "react-router-dom";
import React from 'react';


//import Sidebar from "../scenes/global/Sidebar";
//import Sidebar2 from "../scenes/global/Sidebar2";
import Dashboard from "../src/vistas/Dashboard"; 

function AppRouter(){
  return(
    <div className="app">
      <main className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route exact path="/Dashboard" element={<Dashboard/>}/>
          </Routes>
      </main>
    </div>
  )

}

export default AppRouter