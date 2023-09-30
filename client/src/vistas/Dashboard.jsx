import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import '../css/catalogoProductos.css'
import '../css/carrito.css'


const Dashboard = () => {
    const [productosList, setProductosList] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const navigate = useNavigate();

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

    // Función para proceder a la compra y pasar el carrito
    const procederALaCompra = () => {
        navigate("/Carrito", { state: { carrito } });
    };

    useEffect(() => {
        getLista();
    }, []);

    return (
        <main>
            <div className="container-items">

                {productosList.map((val, key) => {
                    return (
                        <div className="item">
                            <figure>
                                <img src={`http://localhost:3001/productos/imagen/${val.Imagen}`} alt="Producto" />
                            </figure>
                                <div className="info-product">
                                    <h5 >{val.NombreProducto}</h5>
                                    <h1 class="price">Q. {val.PrecioVenta}</h1>
                                    <button onClick={() => agregarAlCarrito(val)}>Añadir al carrito</button>
                                </div>
                        </div>
                    );
                })}

            </div>
            <button className ="info-product" onClick={toggleCarrito}>Mostrar/ocultar carrito</button>
            <div className={`carrito-container ${mostrarCarrito ? 'mostrar' : ''}`}>
                <div className="carrito">
                    <h2>Carrito de Compras</h2>
                    <ul className="articulos-del-carrito">
                        {carrito.map((producto, index) => (
                            <li key={index}>
                                {producto.NombreProducto} - Q. {producto.PrecioVenta}
                            </li>
                        ))}
                    </ul>
                    <button className="info-product" onClick={procederALaCompra}>Proceder a la Compra</button>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;