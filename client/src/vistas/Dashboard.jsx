import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../hoocks/carritoState";
import axios from "axios"
import '../css/catalogoProductos.css'
import '../css/carrito.css'


const Dashboard = () => {
    const [productosList, setProductosList] = useState([]);
    //const [carrito, setCarrito] = useState([]);

    const { carrito, agregarAlCarrito } = useCarrito();

    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const navigate = useNavigate();

    const getLista = () => {
        axios.get("http://localhost:3001/productos/lista").then((response) => {
            setProductosList(response.data);
        })
    }

    /*const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };*/

    const agregarProductoAlCarrito = (producto) => {
        agregarAlCarrito(producto);
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
                        <div className="item" key={val.ProductoID}>
                            <figure>
                                <img onClick={toggleCarrito} src={`http://localhost:3001/productos/imagen/${val.Imagen}`} alt="Producto" />
                            </figure>
                            <div className="info-product">
                                <h5 >{val.NombreProducto}</h5>
                                <h1 class="price">Q. {val.PrecioVenta}</h1>
                                <button className="classBtn first" onClick={() => agregarProductoAlCarrito(val)}>Añadir al carrito</button>
                            </div>
                        </div>
                    );
                })}

            </div>
            <div className={`carrito-container ${mostrarCarrito ? 'mostrar' : ''}`}>
                <div className="carrito">
                    <div class="col checkout__summary">
                        <div class="h3 mb-3">Resumen de orden</div>
                        {carrito.map((producto, index) => (
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
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="classBtn first info-product" onClick={procederALaCompra}>Proceder a la Compra</button>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;