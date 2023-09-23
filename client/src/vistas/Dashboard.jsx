import { useEffect,useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/catalogoProductos.css'

const Dashboard = () => {
    const [productosList, setProductosList] = useState([]); 
    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const getLista = () => {
        axios.get("http://localhost:3001/productos/lista").then((response) => {
            setProductosList(response.data);
        })
    }

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    const toggleCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
    };

    useEffect(() => {
        getLista();
    }, []);

    return (
        <main>
            <div className="container">
                <div className="row row-cols-3">
                    {productosList.map((val, key) => {
                        return (
                            <div className="col mb-4" key={key}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src="https://i.ibb.co/XCNWQHD/principal.jpg"
                                        alt=""
                                        className="card-img-top"
                                        style={{ height: "200px" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{val.NombreProducto}</h5>
                                        <h1 className="card-text">Q. {val.PrecioVenta}</h1>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <h1 className="btn btn-primary">Detalles</h1>
                                            </div>
                                            <h1 className="btn btn-success" onClick={() => agregarAlCarrito(val)}>Agregar</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <button onClick={toggleCarrito}>Mostrar/ocultar carrito</button>
            <div className={`col-md-4 ${mostrarCarrito ? 'mostrar' : ''}`}>
                <div className="carrito">
                    <h2>Carrito de Compras</h2>
                    <ul>
                        {carrito.map((producto, index) => (
                            <li key={index}>
                                {producto.NombreProducto} - Q. {producto.PrecioVenta}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;