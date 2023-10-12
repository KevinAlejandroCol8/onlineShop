import { useEffect, useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/proveedores.css'

const Proveedores = () => {
    /*Campos de la base de datos*/
    const [ProveedorID, setProveedorID] = useState("");

    const [NombreProveedor, setNombreProveedor] = useState("");
    const [Direccion, setDireccion] = useState("");
    const [InformacionContacto, setInformacionContacto] = useState("");
    const [Telefono, setTelefono] = useState("");
    const [CorreoElectronico, setCorreoElectronico] = useState("");
    const [SitioWeb, setSitioWeb] = useState("");
    const [TipoProductoServicio, setTipoProductoServicio] = useState("");
    const [FechaInicioRelacion, setFechaInicioRelacion] = useState("");
    const [NotasComentarios, setNotasComentarios] = useState("");
    const [EstadoRelacion, setEstadoRelacion] = useState("");
    /*Fin campos*/

    /*Lista elementos a mostrar*/
    const [proveedoresList, setproveedoresList] = useState([]); //Lista
    /*Fin lista a mostrar*/
    const [editar, setEditar] = useState(false)

    const add = () => {
        axios.post("http://localhost:3001/Proveedores/create", {
            NombreProveedor: NombreProveedor,
            Direccion: Direccion,
            InformacionContacto: InformacionContacto,
            Telefono: Telefono,
            CorreoElectronico: CorreoElectronico,
            SitioWeb: SitioWeb,
            TipoProductoServicio: TipoProductoServicio,
            FechaInicioRelacion: FechaInicioRelacion,
            NotasComentarios: NotasComentarios,
            EstadoRelacion: EstadoRelacion
        }).then(() => {
            getLista();
            limpiar();
            //alert("Empleado Registrado");
        })
    }

    const update = () => {
        axios.put("http://localhost:3001/Proveedores/update", {
            NombreProveedor: NombreProveedor,
            Direccion: Direccion,
            InformacionContacto: InformacionContacto,
            Telefono: Telefono,
            CorreoElectronico: CorreoElectronico,
            SitioWeb: SitioWeb,
            TipoProductoServicio: TipoProductoServicio,
            FechaInicioRelacion: FechaInicioRelacion,
            NotasComentarios: NotasComentarios,
            EstadoRelacion: EstadoRelacion,
            ProveedorID: ProveedorID
        }).then(() => {
            getLista();
            limpiar();
        })
    }

    const eliminar = (ProveedorID) => {
        axios.delete(`http://localhost:3001/Proveedores/eliminar/${ProveedorID}`).then(() => {
            getLista();
        })
    }

    const limpiar = () => {
        setEditar(false);
        setNombreProveedor("");
        setDireccion("");
        setInformacionContacto("");
        setTelefono("");
        setCorreoElectronico("");
        setSitioWeb("");
        setTipoProductoServicio("");
        setFechaInicioRelacion("");
        setNotasComentarios("");
        setEstadoRelacion("");
        setProveedorID("");
    }

    const getLista = () => {
        axios.get("http://localhost:3001/Proveedores/lista").then((response) => {
            setproveedoresList(response.data);
        })
    }

    const editarList = (val) => {
        setEditar(true);
        setNombreProveedor(val.NombreProveedor);
        setDireccion(val.Direccion);
        setInformacionContacto(val.InformacionContacto);
        setTelefono(val.Telefono);
        setCorreoElectronico(val.CorreoElectronico);
        setSitioWeb(val.SitioWeb);
        setTipoProductoServicio(val.TipoProductoServicio);
        setFechaInicioRelacion(val.FechaInicioRelacion);
        setNotasComentarios(val.NotasComentarios);
        setEstadoRelacion(val.EstadoRelacion);
        setProveedorID(val.ProveedorID);
    }

    useEffect(() => {
        getLista();
    }, []);

    return (
        <>
            <div className="inicio_descuentos">
                <div className="container_register_descuentos">
                    <h1>Proveedores</h1>
                    <div className="mb-3">
                        <h3 className="titulos">Nombre Proveedor</h3>
                        <input
                            onChange={(event) => {
                                setNombreProveedor(event.target.value);
                            }}
                            value={NombreProveedor} type="text" className="form-control custom-input" id="NombreProveedor" placeholder="Nombre Proveedor" />
                    </div>
                    <div className="mb-3">
                        <h3 className="titulos">Dirección</h3>
                        <input
                            onChange={(event) => {
                                setDireccion(event.target.value);
                            }}
                            value={Direccion} type="text" className="form-control custom-input" id="Direccion" placeholder="Direccion" />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Informacion de Contacto</h3>
                            <input
                                onChange={(event) => {
                                    setInformacionContacto(event.target.value);
                                }}
                                value={InformacionContacto} type="text" className="form-control custom-input" id="InformacionContacto" placeholder="Informacion de Contacto" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Numero de Telefono</h3>
                            <input
                                onChange={(event) => {
                                    setTelefono(event.target.value);
                                }}
                                value={Telefono} type="text" className="form-control custom-input" id="Telefono" placeholder="xxxxxxxx" maxLength="8"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Correo Electronico</h3>
                            <input
                                onChange={(event) => {
                                    setCorreoElectronico(event.target.value);
                                }}
                                value={CorreoElectronico} type="text" className="form-control custom-input" id="CorreoElectronico" placeholder="example@gmail.com" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h3 className="titulos">Sitios Web</h3>
                            <input
                                onChange={(event) => {
                                    setSitioWeb(event.target.value);
                                }}
                                value={SitioWeb} type="text" className="form-control custom-input" id="SitioWeb" placeholder="example.com" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <h3 className="titulos">Producto Servicio</h3>
                        <input
                            onChange={(event) => {
                                setTipoProductoServicio(event.target.value);
                            }}
                            value={TipoProductoServicio} type="text" className="form-control custom-input" id="TipoProductoServicio" placeholder="Tecnologia" />
                    </div>
                    <div className="mb-3">
                        <h3 className="titulos">Fecha Inicio Relacion</h3>
                        <input
                            onChange={(event) => {
                                setFechaInicioRelacion(event.target.value);
                            }}
                            value={FechaInicioRelacion} type="date" className="form-control custom-input" id="FechaInicioRelacion" />
                    </div>
                    <div className="mb-3">
                        <h3 className="titulos">Comentarios</h3>
                        <textarea
                            onChange={(event) => {
                                setNotasComentarios(event.target.value);
                            }}
                            value={NotasComentarios}
                            className="form-control custom-input"
                            id="NotasComentarios"
                        ></textarea>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        {
                            editar === true ?
                                <div>
                                    <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                                    <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
                                </div>
                                : <button className='btn btn-success' onClick={add}>Guardar</button>
                        }
                    </div>
                    <br></br>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre Proveedor</th>
                                <th scope="col">Información de Contacto</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Email</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                proveedoresList.map((val, key) => {
                                    return <tr key={val.ProveedorID}>
                                        <th scope="row">{val.ProveedorID}</th>
                                        <td>{val.NombreProveedor}</td>
                                        <td>{val.InformacionContacto}</td>
                                        <td>{val.Telefono}</td>
                                        <td>{val.CorreoElectronico}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button
                                                    onClick={() => {
                                                        editarList(val);
                                                    }}
                                                    type="button" className="btn btn-warning">Editar</button>
                                                <button
                                                    onClick={() => {
                                                        eliminar(val.ProveedorID);
                                                    }}
                                                    type="button" className="btn btn-danger">Eliminar</button>
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

export default Proveedores;