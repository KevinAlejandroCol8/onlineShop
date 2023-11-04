import React, { useState, useEffect } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Compras.css'

const Compras = () => {

    // Estado para almacenar el número aleatorio
    const [CompraID, setCompraID] = useState('');
    const [ProveedorID, setProveedorID] = useState("");
    const [ProductoID, setProductoID] = useState("");

    //Datos Detalle
    const [Cantidad, setCantidad] = useState('');
    const [PrecioCompra, setPrecioCompra] = useState('');
    // Listas de datos
    const [proveedoresList, setproveedoresList] = useState([]);
    const [productosList, setProductosList] = useState([]);

    const [detallesComprasList, setDetallesComprasList] = useState([]);
    
    //Almancenamiento 
    const [cantidadOriginal, setCantidadOriginal] = useState([]);


    // Proveedores
    const cargarProveedores = () => {
        axios.get("http://localhost:3001/Proveedores/lista").then((response) => {
            setproveedoresList(response.data);
        })
    }

    //Productos
    const cargarProductos = () => {
        axios.get("http://localhost:3001/productos/lista").then((response) => {
            setProductosList(response.data);
        })
    }

    //Detalle
    const cargarDetallesCompras = () => {
        axios.get("http://localhost:3001/Compras/detallesCP").then((response) => {
            setDetallesComprasList(response.data);
        })
    }

    //Cantidad Original
    const cargaOriginal = () => {
        axios.get(`http://localhost:3001/Compras/producto-cantidad/${ProductoID}`)
        .then((response) => {
            setCantidadOriginal(response.data);
        })
        .catch((error) => {
            console.error("Error al obtener la cantidad original:", error);
        });
    }

    //Segmento CRUD 
    const addDetalle = () => {
        const formData = new FormData();
        formData.append("Cantidad", Cantidad);
        formData.append("PrecioCompra", PrecioCompra);
        formData.append("ProductoID", ProductoID);
        formData.append("CompraID", CompraID);

        axios.post("http://localhost:3001/Compras/create-detalle", formData)
            .then(() => {
                cargarDetallesCompras();
                //limpiar();
            });
    };


    const addInventario = () => {
        const formData = new FormData();
        formData.append("Cantidad",Cantidad);
        formData.append("ProductoID",ProductoID);

        axios.post("http://localhost:3001/Compras/create-inventario", formData)
        .then(() => {
            console.log("Ingreso corecto del registro");
        })
    }

    const addCompra = () => {
        addDetalle();
        addInventario();
        //Carga montos original Cantidad del producto
        cargaOriginal();
    }

    const ActualizarCantidad  = () => {
        axios.put("http://localhost:3001/productos/update", {
          NombreProducto: NombreProducto,
          DescripcionProducto: DescripcionProducto,
          PrecioVenta: PrecioVenta,
          //CostoAdquisicion: CostoAdquisicion,
          //CantidadDisponible: CantidadDisponible,
          Imagen: Imagen,
          //ProveedorID: ProveedorID,
          TipoProductoID: TipoProductoID,
          ProductoID: ProductoID
        }).then(() => {
          setEditar(false);
          getLista();
          limpiar();
        })
      }


    // useEffect para generar un número aleatorio cuando se monta el componente
    useEffect(() => {
        const numero = Math.floor(Math.random() * 10000); // Genera un número entre 0 y 9999
        setCompraID(numero);
        cargarProveedores();
        cargarProductos();
        cargarDetallesCompras();
    }, []);


    return (
        <>
            <br></br>
            <br></br>
            <div class="inicio_Compras">
                <div class="container_register_Compras">
                    <div className="row">
                        <div className="col-md-10 mb-3">
                            <h1>Compras</h1>
                        </div>
                        <div className="col-md-2 mb-3">
                            <button type="button" class="btn btn-outline-success">Finalizar</button>
                        </div>
                    </div>
                    <div className='NumeroCompra'>
                        <div class="mb-3">
                            <h3 class="titulos NumeroCompra"># Compra</h3>
                            <input
                                type="text"
                                className="form-control custom-input inputCompra"
                                id="NombreDescuento"
                                placeholder="Nombre Completo"
                                value={CompraID}
                                readOnly
                            />
                        </div>
                    </div>
                    <h1 className="miLineaDivisoria"></h1>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <h3 className="titulos">Monto Compra</h3>
                            <input type="text" className="inputDiseño" id="montoCompra" readOnly />
                        </div>
                        <div className="col-md-3 mb-3">
                            <h3 className="titulos">Cantidad Total</h3>
                            <input type="text" className="inputDiseño" id="cantidadTotal" readOnly />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Proveedores</h3>
                            <select class="form-select" aria-label="Default select example"
                                onChange={(event) => {
                                    setProveedorID(event.target.value);
                                }}
                                value={ProveedorID}
                            >
                                {
                                    proveedoresList.map((tp, i) => {
                                        return (
                                            <option key={i} value={tp.ProveedorID} >
                                                {tp.NombreProveedor}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <h2 className="miLineaDivisoria"></h2>
                    <div className="row">
                        <div className="col-md-10 mb-3">
                            <h1>Productos</h1>
                        </div>
                        <div className="col-md-2 mb-3">
                            <button type="button" class="btn btn-success" onClick={addCompra}>Guardar</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Producto</h3>
                            <select class="form-select" aria-label="Default select example"
                                onChange={(event) => {
                                    setProductoID(event.target.value);
                                }}
                                value={ProductoID}
                            >
                                {
                                    productosList.map((tp, i) => {
                                        return (
                                            <option key={i} value={tp.ProductoID} >
                                                {tp.NombreProducto}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <h3 className="titulos">Cantidad Total</h3>
                            <input onChange={(event) => {
                                setCantidad(event.target.value);
                            }} value={Cantidad} type="text" className="inputDiseño" id="cantidadTotal" readOnly />
                        </div>
                        <div className="col-md-3 mb-3">
                            <h3 className="titulos">Cantidad Total</h3>
                            <input onChange={(event) => {
                                setPrecioCompra(event.target.value);
                            }} value={PrecioCompra} type="text" className="inputDiseño" id="cantidadTotal" readOnly />
                        </div>
                    </div>
                    <h2 className="miLineaDivisoria"></h2>
                    <h1>Listado Productos</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio Compra</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detallesComprasList.map((val, key) => {
                                    return <tr key={val.DetalleID}>
                                        <th scope="row">{val.DetalleID}</th>
                                        <td>{val.ProductoID}</td>
                                        <td>{val.PrecioCompra}</td>
                                        <td>{val.Cantidad}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button type="button" className="btn btn-warning">Editar</button>
                                                <button type="button" className="btn btn-danger">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Compras;