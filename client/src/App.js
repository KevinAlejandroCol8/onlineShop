import React from 'react'
import AppRouter from "./AppRouter"
import { BrowserRouter as Router} from "react-router-dom";
//import { ProSidebarProvider } from 'react-pro-sidebar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <AppRouter/>
    </Router>        
  );

}

export default App;
