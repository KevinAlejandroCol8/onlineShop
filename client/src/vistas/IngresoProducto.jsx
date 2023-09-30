import { useEffect,useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'


const IngresoProducto = () => {

    /*Cmapos de la base de datos*/
  const [NombreProducto, setNombreProducto] = useState("");
  const [DescripcionProducto, setDescripcionProducto] = useState("");
  const [PrecioVenta, setPrecioVenta] = useState("");
  const [CostoAdquisicion, setCostoAdquisicion] = useState("");
  const [CantidadDisponible, setCantidadDisponible] = useState("");
  const [SKU, setSKU] = useState("");
  const [Imagen, setImagen] = useState(null);
  const [DescuentoID, setDescuentoID] = useState("");
  const [TipoProductoID, setTipoProductoID] = useState("");
  const [ProductoID, setProductoID] = useState("");
  /*Fin campos*/

  /*Lista elementos a mostrar*/
  const [productosList, setProductosList] = useState([]); //Lista
  /*Fin lista a mostrar*/
  const [descuentosList, setdescuentosList] = useState([]);
  const [tipoProductoList, settipoProductoList] = useState([]);
  /*List llaves PK*/

  /*fIN */

  const [editar, setEditar] = useState(false)

  /*const mostrarDatos = () =>{
    alert(nombre);
  }*/

  /*const add = () => {
    axios.post("http://localhost:3001/productos/create", {
        NombreProducto: NombreProducto,
        DescripcionProducto: DescripcionProducto,
        PrecioVenta: PrecioVenta,
        CostoAdquisicion: CostoAdquisicion,
        CantidadDisponible: CantidadDisponible,
        Imagen: Imagen,
        DescuentoID: DescuentoID,
        TipoProductoID: TipoProductoID
    }).then(() => {
        getLista();
        limpiar();
        //alert("Empleado Registrado");
    })
  }*/
  /*Nueva Forma */
  const add = () => {
    const formData = new FormData();
    formData.append("NombreProducto", NombreProducto);
    formData.append("DescripcionProducto", DescripcionProducto);
    formData.append("PrecioVenta", PrecioVenta);
    formData.append("CostoAdquisicion", CostoAdquisicion);
    formData.append("CantidadDisponible", CantidadDisponible);
    formData.append("SKU", SKU);
    formData.append("Imagen", Imagen); // Aquí adjuntamos la imagen seleccionada
    formData.append("DescuentoID", DescuentoID);
    formData.append("TipoProductoID", TipoProductoID);
  
    axios.post("http://localhost:3001/productos/create", formData)
      .then(() => {
        getLista();
        limpiar();
      });
  };

  const update = () => {
    axios.put("http://localhost:3001/productos/update", {
        NombreProducto: NombreProducto,
        DescripcionProducto: DescripcionProducto,
        PrecioVenta: PrecioVenta,
        CostoAdquisicion:CostoAdquisicion,
        CantidadDisponible: CantidadDisponible,
        Imagen: Imagen,
        DescuentoID: DescuentoID,
        TipoProductoID: TipoProductoID,
        ProductoID: ProductoID
    }).then(() => {
        setEditar(false);
        getLista();
        limpiar();
    })
  }

  const eliminar = (idPrueba) => {
    axios.delete(`http://localhost:3001/productos/elimiarEmpleado/${idPrueba}`).then(() => {
        getLista();
    })
  }

  const limpiar = () =>{
    setEditar(false);
    setNombreProducto("");
    setDescripcionProducto("");
    setPrecioVenta("");
    setCostoAdquisicion("");
    setCantidadDisponible("");
    setImagen("");
    setDescuentoID("");
    setTipoProductoID("");
    setProductoID("");
    setSKU("");
  }

  const getLista = () => {
    axios.get("http://localhost:3001/productos/lista").then((response) => {
        setProductosList(response.data);
    })
  }

  const cargarDescuentos = () => {
    axios.get("http://localhost:3001/descuentos/lista").then((response) => {
        setdescuentosList(response.data);
    })
  }

  const cargarTipoProducto = () => {
    axios.get("http://localhost:3001/tiposProductos/lista").then((response) => {
        settipoProductoList(response.data);
    })
  }

  const editarList = (val) => {
    setEditar(true);
    setNombreProducto(val.NombreProducto);
    setDescripcionProducto(val.DescripcionProducto);
    setPrecioVenta(val.PrecioVenta);
    setCostoAdquisicion(val.CostoAdquisicion);
    setCantidadDisponible(val.CantidadDisponible);
    setImagen(val.Imagen);
    setDescuentoID(val.DescuentoID);
    setSKU(val.SKU);
    setTipoProductoID(val.TipoProductoID);
    setProductoID(val.ProductoID);
  }

  useEffect(() => {
      getLista();
      cargarDescuentos();
      cargarTipoProducto();
  }, []);

  return (
    <div className="container">
      <br></br>
      <div className="card text-center">
        <div className="card-header">
          Ingreso De Productos
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre Producto</span>
            <input
              onChange={(event) => {
                setNombreProducto(event.target.value);
              }}
              type="text" value={NombreProducto} className="form-control" placeholder="Nombre Producto" aria-label="Nombre Producto" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Descripcion Producto</span>
            <input
              onChange={(event) => {
                setDescripcionProducto(event.target.value);
              }}
              type="text" value={DescripcionProducto} className="form-control" placeholder="Descripción Producto" aria-label="Descripción Producto" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio Venta</span>
            <input
              onChange={(event) => {
                setPrecioVenta(event.target.value);
              }}
              type="text" value={PrecioVenta} className="form-control" placeholder="Precio Venta" aria-label="Precio Venta" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Costo Adquisicion</span>
            <input
              onChange={(event) => {
                setCostoAdquisicion(event.target.value);
              }}
              type="text" value={CostoAdquisicion} className="form-control" placeholder="Costo Adquision" aria-label="Costo Adquision" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cantidad</span>
            <input
              onChange={(event) => {
                setCantidadDisponible(event.target.value);
              }}
              type="text" value={CantidadDisponible} className="form-control" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">SKU</span>
            <input
              onChange={(event) => {
                setSKU(event.target.value);
              }}
              type="text" value={SKU} className="form-control" placeholder="SKU" aria-label="SKU" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Imagen</span>
            <input
              onChange={(event) => {
                setImagen(event.target.files[0]);
              }}
              type="file" className="form-control"  aria-label="Imagen" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Tipo Descuento</span>
            <select class="form-select" aria-label="Default select example"
                onChange={(event) => {
                  setDescuentoID(event.target.value);
                }}
                value={DescuentoID}
            >
                {
                    descuentosList.map((desc, i) => {
                        return (
                            <option key={i} value={desc.DescuentoID} >
                                {desc.NombreDescuento}
                            </option>
                        )
                    })
                }
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Tipo Producto</span>
            <select class="form-select" aria-label="Default select example"
                onChange={(event) => {
                  setTipoProductoID(event.target.value);
                }}
                value={TipoProductoID}
            >
                {
                    tipoProductoList.map((tp, i) => {
                        return (
                            <option key={i} value={tp.TipoProductoID} >
                                {tp.NombreTipoProducto}
                            </option>
                        )
                    })
                }
            </select>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar===true?
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
              <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button> 
            </div>
            :<button className='btn btn-success' onClick={add}>Guardar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio Venta</th>
            <th scope="col">Costo Adquisicion</th>
            <th scope="col">Cantidad Disponibilidad</th>
            <th scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            productosList.map((val, key) => {
              return <tr key={val.ProductoID}>
                <th scope="row">{val.ProductoID}</th>
                <td>{val.NombreProducto}</td>
                <td>{val.DescripcionProducto}</td>
                <td>{val.PrecioVenta}</td>
                <td>{val.CostoAdquisicion}</td>
                <td>{val.CantidadDisponible}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button 
                      onClick={()=>{
                        editarList(val);
                      }}
                      type="button" className="btn btn-warning">Editar</button>
                    <button 
                      onClick={()=>{
                        eliminar(val.ProductoID);
                      }}
                    type="button" className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
      <button className='btn btn-success' onClick={getLista}>Lista</button>      
    </div>
  );
}

export default IngresoProducto;