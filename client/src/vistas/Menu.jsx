import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import umg_logo from '../img/logo_umg.png'
import cart from '../img/cart.png'
import search from '../img/search.png'
import '../css/main_nav.css'


const Menu = () => {
  const navigate = useNavigate();
  return (
    <nav class="navbar navbar-light bg-light">
        <div className="container-fluid">
        <img src={umg_logo} alt="Microsoft" class="logo" onClick={() => navigate("/Home")}/>
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <ul class="main-menu">
                <li ><a href="#">Catalogo Descuentos</a></li>
                <li ><a href="#">Catalogo Productos</a></li>
                <li ><a href="#">Productos</a></li>
                <li ><a href="#">Empleados</a></li>
                    <li onClick={() => navigate("/descuentos")}><a href="#">Catalogo Descuentos</a></li>
                    <li onClick={() => navigate("/tipoProductos")}><a href="#">Catalogo Productos</a></li>
                    <li onClick={() => navigate("/ingresoProduct")}><a href="#">Productos</a></li>
                    <li onClick={() => navigate("/EmpleadosList")}><a href="#">Empleados</a></li>
            </ul>
            </div>
            <ul class="right-menu">
            <li>
              <a href="#" ><img className="icono" src={search} /></a>
            </li>
            <li>
              <a href="#" onClick={() => navigate("/")}><img className="icono" src={cart} /></a>
            </li>
          </ul>
        </div>
        <script src=""></script>
    </nav>     
  );
}

export default Menu;