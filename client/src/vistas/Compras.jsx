import React, { useState, useEffect } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Compras.css'

const inicio = 1;

const NewCompra = () => {

    //Acciones botones
    const [GuardarGeneral, setGuardarGeneral] = useState(false)

    //General 
    const [CompraID, setCompraID] = useState("");
    const [ProveedorID, setProveedorID] = useState("");
    const [ProductoID, setProductoID] = useState("");

    //Encabezado
    const [MontoCompra, setMontoCompra] = useState("0");
    const [CantidadTotal, setCantidadTotal] = useState("0");

    //Detalle De encabezado
    const [Cantidad, setCantidad] = useState("");
    const [CostoAdquisicion, setCostoAdquisicion] = useState("");

    // Listas de datos
    const [proveedoresList, setproveedoresList] = useState([]);
    const [productosList, setProductosList] = useState([]);
    const [detallesCampraList, setDetallesCampraList] = useState([]);

    //Sumarizacion


    const calculoCantidades = (cantidadNueva, montoNuevo) => {
        const cantidadNumerica = parseInt(cantidadNueva, 10);
        const montoNumerico = parseFloat(montoNuevo); // Usando parseFloat para manejar decimales
        console.log("Ingreso valores ", cantidadNueva, " ",montoNuevo );
        // Actualizar CantidadTotal
        if (!isNaN(cantidadNumerica)) {
            setCantidadTotal((prevTotal) => {
                const prevTotalNum = parseInt(prevTotal, 10) || 0; // Si prevTotal no es un número, inicialízalo a 0
                return prevTotalNum + cantidadNumerica;
            });
        } 

        // Actualizar MontoCompra
        if (!isNaN(montoNumerico)) {
            setMontoCompra((prevMonto) => {
                const prevMontoNum = parseFloat(prevMonto) || 0; // Si prevMonto no es un número, inicialízalo a 0
                return (prevMontoNum + montoNumerico).toFixed(2); // .toFixed(2) para manejar dos decimales
            });
        } 
    }

    //Cargo Proveedores
    const cargarProveedores = () => {
        axios.get("http://localhost:3001/Proveedores/lista").then((response) => {
            setproveedoresList(response.data);
        })
    }

    //Carga Cantidad Original
    const cargaProductos = () => {
        axios.get(`http://localhost:3001/Compras/Detalles/${CompraID}`)
            .then((response) => {
                setDetallesCampraList(response.data);
                calculoCantidades(Cantidad,CostoAdquisicion);
            })
    }


    //Productos
    const cargarProductos = () => {
        axios.get("http://localhost:3001/productos/lista").then((response) => {
            setProductosList(response.data);
        })
    }


    const addEncabezado = () => {
        axios.post("http://localhost:3001/Compras/create", {
            CompraID: CompraID,
            MontoCompra: MontoCompra,
            CantidadTotal: CantidadTotal,
            ProveedorID: ProveedorID
        }).then(() => {
            //limpiar();
            //alert("Registro Guardar");
        })
    }

    const addDetalle = () => {
        axios.post("http://localhost:3001/Compras/createDetalle", {
            Cantidad: Cantidad,
            ProductoID: ProductoID,
            CompraID: CompraID,
            CostoAdquisicion: CostoAdquisicion
        }).then(() => {
            //limpiar();

        })
    }

    const addInventario = () => {
        axios.post("http://localhost:3001/Compras/createInventario", {
            Cantidad: Cantidad,
            ProductoID: ProductoID
        }).then(() => {
            cargaProductos();
            alert("Registro Guardar");
        })
    }

    
    const updateProducto = () => {
        axios.put("http://localhost:3001/Compras/update", {
            CompraID: CompraID,
            MontoCompra: MontoCompra,
            CantidadTotal: CantidadTotal,
            ProveedorID: ProveedorID
        }).then(() => {
            alert("Registro Actualizado");
        })
    }

    const actualizarEncabezado = () =>{
        updateProducto();
    }
    

    const addCompra = () => {
        addEncabezado();
        addDetalle();
        addInventario();
        setGuardarGeneral(true);
        //updateProducto();
    }

    const addCompra2 = () => {
        addDetalle();
        addInventario();
        //updateProducto();
    }

    useEffect(() => {
        const numero = Math.floor(Math.random() * 10000); // Genera un número entre 0 y 9999
        setCompraID(numero);
        cargarProveedores();
        cargarProductos();
    }, []);

    return (
        <>
            <br></br>
            <br></br>
            <div class="inicio_Compras">
                <div class="container_register_Compras">
                    <div className="row">
                        <div className="col-md-9 mb-3">
                            <h1>Compras</h1>
                        </div>
                        <div className="col-md-2 mb-3">
                            <button  onClick={actualizarEncabezado} type="button" class="btn btn-outline-success">Finalizar</button>
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
                            <input
                                onChange={(event) => {
                                    setMontoCompra(event.target.value);
                                }}
                                value={MontoCompra} type="text" className="inputDiseño" id="montoCompra" readOnly/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <h3 className="titulos">Cantidad Total</h3>
                            <input
                                onChange={(event) => {
                                    setCantidadTotal(event.target.value);
                                }}
                                value={CantidadTotal} type="text" className="inputDiseño" id="cantidadTotal" readOnly/>
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
                            {
                                GuardarGeneral === true ?
                                    <button type="button" class="btn btn-success" onClick={addCompra2}>Guardar</button>
                                    :
                                    <button type="button" class="btn btn-success" onClick={addCompra}>Guardar</button>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Producto</h3>
                            <select class="form-select" aria-label="Default select example"
                                onChange={(event) => {
                                    setProductoID(event.target.value);
                                }}
                                value={ProductoID}>
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
                            }} value={Cantidad} type="text" className="inputDiseño" id="cantidadTotal" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <h3 className="titulos">Precio Compra</h3>
                            <input onChange={(event) => {
                                setCostoAdquisicion(event.target.value);
                            }} value={CostoAdquisicion} type="text" className="inputDiseño" id="cantidadTotal" />
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
                                detallesCampraList.map((val, key) => {
                                    return <tr key={val.DetalleID}>
                                        <th scope="row">{val.DetalleID}</th>
                                        <td>{val.ProductoID}</td>
                                        <td>{val.CostoAdquisicion}</td>
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
};

export default NewCompra;
