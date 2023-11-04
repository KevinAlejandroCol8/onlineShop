import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../hoocks/carritoState";
import axios from "axios"
import '../css/catalogoProductos.css'
import '../css/carrito.css'


const Dashboard = () => {
    const [productosList, setProductosList] = useState([]);
    //const [carrito, setCarrito] = useState([]);

    //Filtros
    const [filtroPrecio, setFiltroPrecio] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
    const [filtroNombre, setFiltroNombre] = useState('');
    const [tiposSeleccionados, setTiposSeleccionados] = useState([]);

    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    //Tipos 
    const [tipoProductoList, settipoProductoList] = useState([]);

    const { carrito, agregarAlCarrito } = useCarrito();
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const navigate = useNavigate();

    const getLista = () => {
        axios.get("http://localhost:3001/productos/listaOfical").then((response) => {
            setProductosList(response.data);
        })
    }

    const cargarTipoProducto = () => {
        axios.get("http://localhost:3001/tiposProductos/lista").then((response) => {
            settipoProductoList(response.data);
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

    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(producto); // Guarda la información del producto seleccionado
        toggleCarrito(); // Muestra el carrito
    };


    const productosFiltrados = productosList.filter((producto) => {
        const precioDentroDelRango = producto.PrecioVenta >= filtroPrecio.min && producto.PrecioVenta <= filtroPrecio.max;
        const nombreCoincide = producto.NombreProducto.toLowerCase().includes(filtroNombre.toLowerCase());
        const tipoSeleccionado = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(producto.TipoProductoID);
        return precioDentroDelRango && (filtroNombre === '' || nombreCoincide) && tipoSeleccionado;
    });

    const handleTipoChange = (tipoId) => {
        setTiposSeleccionados((prevTipos) => {
            if (prevTipos.includes(tipoId)) {
                return prevTipos.filter((t) => t !== tipoId); // Si ya está seleccionado, lo quitamos
            } else {
                return [...prevTipos, tipoId]; // Si no está seleccionado, lo agregamos
            }
        });
    };


    useEffect(() => {
        getLista();
        cargarTipoProducto();
    }, []);

    return (
        <main>
            <br></br>
            <div className="filter-sidebar">
                <h1>Filtro de Busqueda</h1>
                <h2>Precio:</h2>
                <h4>Minimo</h4>
                <input
                    className="MiTamaño"
                    type="number"
                    name="min"
                    placeholder="Precio mínimo"
                    value={filtroPrecio.min}
                    onChange={handleFilterChange}
                />
                <h4>Maximo</h4>
                <input
                    className="MiTamaño"
                    type="number"
                    name="max"
                    placeholder="Precio máximo"
                    value={filtroPrecio.max}
                    onChange={handleFilterChange}
                />
                <h2>Nombre:</h2>
                <input
                    className="MiTamaño"
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                />
                <h2>Tipos de Producto:</h2>
                <div className="tipo-producto-grid">
                    {tipoProductoList.map((tipo) => (
                        <div className="tipo-producto-item" key={tipo.TipoProductoID}>
                            <input
                                type="checkbox"
                                id={`tipo-${tipo.TipoProductoID}`}
                                checked={tiposSeleccionados.includes(tipo.TipoProductoID)}
                                onChange={() => handleTipoChange(tipo.TipoProductoID)}
                            />
                            <h4 htmlFor={`tipo-${tipo.TipoProductoID}`}>{tipo.NombreTipoProducto}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <br></br>
            <div className="container-items">

                {productosFiltrados.map((val, key) => {
                    return (
                        <div className="item" key={val.ProductoID}>
                            <figure>
                                <img onClick={() => seleccionarProducto(val)} src={`http://localhost:3001/productos/imagen/${val.Imagen}`} alt="Producto" />
                            </figure>
                            <div className="info-product">
                                <div className="stock-badge en-stock">{val.CantidadDisponible} en stock</div>
                                <h5 >{val.NombreProducto}</h5>
                                <h1 class="price">Q. {val.PrecioVenta}</h1>
                                <button className="classBtn first" onClick={() => agregarProductoAlCarrito(val)}>Añadir al carrito</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={` product-details right-sidebar ${mostrarCarrito ? 'mostrar' : ''}`}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1 className="h1-saludo">Preview</h1>
                <br></br>
                <br></br>
                <br></br>
                {productoSeleccionado && (
                    <div>
                        <figure>
                            <img className="MiImgen" onClick={toggleCarrito} src={`http://localhost:3001/productos/imagen/${productoSeleccionado.Imagen}`} alt="Producto" />
                        </figure>
                        <h1 className="product-name">{productoSeleccionado.NombreProducto}</h1>
                        <p className="product-price">Precio: Q. {productoSeleccionado.PrecioVenta}</p>
                        <p className="product-quantity">Cantidad Disponible: {productoSeleccionado.CantidadDisponible}</p>
                        {/* Aquí puedes agregar más detalles del producto como desees */}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Dashboard;