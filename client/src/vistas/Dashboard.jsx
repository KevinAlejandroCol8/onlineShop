import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../hoocks/carritoState";
import axios from "axios"
import '../css/catalogoProductos.css'
import '../css/carrito.css'


const Dashboard = () => {
    const [productosList, setProductosList] = useState([]);
    //const [carrito, setCarrito] = useState([]);

    const [filtroPrecio, setFiltroPrecio] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
    const { carrito, agregarAlCarrito } = useCarrito();
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const navigate = useNavigate();

    const getLista = () => {
        axios.get("http://localhost:3001/productos/listaOfical").then((response) => {
            setProductosList(response.data);
        })
    }


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


    // Actualiza el estado del filtro
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltroPrecio((prev) => ({ ...prev, [name]: value }));
    };

    // Filtra los productos por precio
    const productosFiltrados = productosList.filter((producto) => {
        return producto.PrecioVenta >= filtroPrecio.min && producto.PrecioVenta <= filtroPrecio.max;
    });

    useEffect(() => {
        getLista();
    }, []);

    return (
        <main>
            <div className="filter-container">
                <h1>Filtro de Busqueda</h1>
                <h2>Precio:</h2>
                <h4>Minimo</h4>
                <input
                    type="number"
                    name="min"
                    placeholder="Precio mínimo"
                    value={filtroPrecio.min}
                    onChange={handleFilterChange}
                />
                <h4>Maximo</h4>
                <input
                    type="number"
                    name="max"
                    placeholder="Precio máximo"
                    value={filtroPrecio.max}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="container-items">

                {productosFiltrados.map((val, key) => {
                    return (
                        <div className="item" key={val.ProductoID}>
                            <figure>
                                <img onClick={toggleCarrito} src={`http://localhost:3001/productos/imagen/${val.Imagen}`} alt="Producto" />
                            </figure>
                            <div className="info-product">
                                <div className="stock-badge">{val.CantidadDisponible} en stock</div>
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
                    <div className="col checkout__summary">
                        <div className="h3 mb-3">Resumen de orden</div>
                        {carrito.map((producto, index) => (
                            <div className="card p-3 shadow rounded-3">
                                <div className="row align-items-center mb-4">
                                    <div className="col-4">
                                        <div className="rounded-3 overflow-hidden">
                                            <img src={`http://localhost:3001/productos/imagen/${producto.Imagen}`} width="100%" alt="Producto" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="nombreProducto h6 mb-1">{producto.NombreProducto}</div>
                                        <div className="descripcionProducto text-muted small mb-1">{producto.DescripcionProducto}{producto.PrecioVenta}</div>
                                        <div className="montoProducto h5 mb-0"> Q. {producto.PrecioVenta}</div>
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