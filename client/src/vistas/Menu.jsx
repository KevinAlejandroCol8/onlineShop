import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


const Menu = () => {
    const navigate = useNavigate();
  return (
    <nav class="navbar navbar-light bg-light">
        <div className="container-fluid">
            <h1 className="navbar-brand" onClick={() => navigate("/")}>OnlyShop</h1>
            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="button" class="btn btn-info m-1" onClick={() => navigate("/tipoProductos")}>Catalogo Productos</button>
                <button type="button" class="btn btn-info m-1" onClick={() => navigate("/descuentos")}>Catalogo Descuentos</button>
                <button type="button" class="btn btn-info m-1" onClick={() => navigate("/ingresoProduct")}>Productos</button>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => navigate("/EmpleadosList")}
            >
            <span className="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>     
  );
}

export default Menu;