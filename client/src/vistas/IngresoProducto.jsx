import { useEffect, useState } from "react"
import axios from "axios"
import '../css/IngresoProducto.css'


const IngresoProducto = () => {

  /*Cmapos de la base de datos*/
  const [NombreProducto, setNombreProducto] = useState("");
  const [DescripcionProducto, setDescripcionProducto] = useState("");
  const [PrecioVenta, setPrecioVenta] = useState("");
  //const [CostoAdquisicion, setCostoAdquisicion] = useState("");
  //const [CantidadDisponible, setCantidadDisponible] = useState("");
  const [Imagen, setImagen] = useState(null);
  //const [ProveedorID, setProveedorID] = useState("");
  const [TipoProductoID, setTipoProductoID] = useState("");
  const [ProductoID, setProductoID] = useState("");
  /*Fin campos*/

  /*Lista elementos a mostrar*/
  const [productosList, setProductosList] = useState([]); //Lista
  /*Fin lista a mostrar*/
  //const [proveedoresList, setproveedoresList] = useState([]);
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
    //formData.append("CostoAdquisicion", CostoAdquisicion);
    //formData.append("CantidadDisponible", CantidadDisponible);
    formData.append("SKU", SKU);
    formData.append("Imagen", Imagen); // Aquí adjuntamos la imagen seleccionada
    //formData.append("ProveedorID", ProveedorID);
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

  const eliminar = (ProductoID) => {
    axios.delete(`http://localhost:3001/productos/eliminar/${ProductoID}`).then(() => {
      getLista();
    })
  }

  const limpiar = () => {
    setEditar(false);
    setNombreProducto("");
    setDescripcionProducto("");
    setPrecioVenta("");
    //setCostoAdquisicion("");
    //setCantidadDisponible("");
    setImagen("");
    //setProveedorID("");
    setTipoProductoID("");
    setProductoID("");
    setSKU("");
  }

  const getLista = () => {
    axios.get("http://localhost:3001/productos/lista").then((response) => {
      setProductosList(response.data);
    })
  }


  /*
  const cargarProveedores = () => {
    axios.get("http://localhost:3001/Proveedores/lista").then((response) => {
      setproveedoresList(response.data);
    })
  }
  */

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
    //setCostoAdquisicion(val.CostoAdquisicion);
    //setCantidadDisponible(val.CantidadDisponible);
    setImagen(val.Imagen);
    //setProveedorID(val.ProveedorID);
    setSKU(val.SKU);
    setTipoProductoID(val.TipoProductoID);
    setProductoID(val.ProductoID);
  }

  useEffect(() => {
    getLista();
    //cargarProveedores();
    cargarTipoProducto();
  }, []);


  const [SKU, setSKU] = useState('');
  const generateSKU = () => {
    // Generar un SKU aleatorio (en este caso, una cadena de 8 caracteres)
  const randomSKU = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Actualizar el estado con el SKU generado
    setSKU(randomSKU);
  };
  return (
    <div className="inicio_ingreso_producto">
      <div className="container_register_ingreso_producto">
        <h1>Ingreso De Productos</h1>
        <div className="mb-3">
          <h3 className="titulos">Nombre del Producto </h3>
          <input
            onChange={(event) => {
              setNombreProducto(event.target.value);
            }}
            type="text" value={NombreProducto}  placeholder="Nombre del Producto" aria-label="Nombre Producto" />
          <div className="mb-3">
            <h3 className="titulos">Descripcion del Producto</h3>
            <input
              onChange={(event) => {
                setDescripcionProducto(event.target.value);
              }}
              type="text" value={DescripcionProducto}   placeholder="Descripción del Producto" aria-label="Descripción Producto" />
          </div>
          <div className="mb-3">
            <h3 className="titulos">Precio de Venta</h3>
            <input
              onChange={(event) => {
                setPrecioVenta(event.target.value);
              }}
              type="text" value={PrecioVenta}   placeholder="Precio de Venta" aria-label="Precio Venta" />
          </div>
          {/*/ 
          <div className="mb-3">
            <h3 className="titulos">Costo de Adquisicion</h3>
            <input
              onChange={(event) => {
                setCostoAdquisicion(event.target.value);
              }}
              type="text" value={CostoAdquisicion}   placeholder="Costo de Adquisicion" aria-label="Costo Adquision" />
          </div>
          */}
          {/* 
          <div className="mb-3">
            <h3 className="titulos">Cantidad de Productos</h3>
            <input
              onChange={(event) => {
                setCantidadDisponible(event.target.value);
              }}
              type="text" value={CantidadDisponible}   placeholder="Cantidad de Productos" aria-label="Cantidad" />
          </div>

          <div className="">

          */}
          <div className="mb-3">
            <h3 className="titulos">SKU</h3>
            <div className="col v-center">
              <input
                onChange={(event) => {
                  setSKU(event.target.value);
                }}
                type="text"
                value={SKU}
                
                placeholder="SKU"
                aria-label="SKU"
              />
              <button class="mx-auto" onClick={generateSKU}>Generar SKU</button>
            </div>
          </div>
          <div className="mb-3">
            <h3 className="titulos">Imagen</h3>
            <input
              onChange={(event) => {
                setImagen(event.target.files[0]);
              }}
              type="file"  aria-label="Imagen" />
          </div> 
          {/* 
          <div className="mb-3">
            <h3 className="titulos">Prooveedor</h3>
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
          */}
          <div className="mb-3">
            <h3 className="titulos">Tipo Producto</h3>
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
        <div className="mb-3 d-flex justify-content-center">
          {
            editar === true ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button  onClick={add}>Guardar</button>
          }
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre Producto</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio Venta</th>
              {/* 
              <th scope="col">Costo Adquisicion</th>
              <th scope="col">Cantidad Disponibilidad</th>
              */}
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
                  {/* 
                  <td>{val.CostoAdquisicion}</td>
                  <td>{val.CantidadDisponible}</td>
                  */}
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button
                        onClick={() => {
                          editarList(val);
                        }}
                        type="button" className="btn btn-warning">Editar</button>
                      <button
                        onClick={() => {
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
        <button onClick={getLista}>Lista</button>
      </div>
    </div>
  );
}

export default IngresoProducto;