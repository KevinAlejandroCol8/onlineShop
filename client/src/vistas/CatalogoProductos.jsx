import { useEffect, useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/TipoProductos.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const CatalogoProductos = () => {
  const MySwal = withReactContent(Swal);
  /*Cmapos de la base de datos*/
  const [NombreTipoProducto, setTipoProducto] = useState("");
  const [TipoProductoID, setTipoProductoID] = useState("");
  /*Fin campos*/
  /*Lista elementos a mostrar*/
  const [NombreTipoProductoList, setTipoProductoList] = useState([]); //Lista
  /*Fin lista a mostrar*/
  const [editar, setEditar] = useState(false)


  const add = () => {
    axios.post("http://localhost:3001/tiposProductos/create", {
      NombreTipoProducto: NombreTipoProducto
    }).then(() => {
      getLista();
      limpiar();
      MySwal.fire({
        title: <p>Registro</p>,
        html: <i>Su registro fue guardo con exito</i>,
        icon: 'success'
      });
    })
  }

  const update = () => {
    axios.put("http://localhost:3001/tiposProductos/update", {
      NombreTipoProducto: NombreTipoProducto,
      TipoProductoID: TipoProductoID
    }).then(() => {
      getLista();
      limpiar();
    })
  }

  const eliminar = (TipoProductoID) => {
    axios.delete(`http://localhost:3001/tiposProductos/eliminar/${TipoProductoID}`).then(() => {
      getLista();
    })
  }

  const limpiar = () => {
    setEditar(false);
    setTipoProducto("");
    setTipoProductoID("");
  }

  const getLista = () => {
    axios.get("http://localhost:3001/tiposProductos/lista").then((response) => {
      setTipoProductoList(response.data);
    })
  }

  const editarList = (val) => {
    setEditar(true);
    setTipoProducto(val.NombreTipoProducto);
    setTipoProductoID(val.TipoProductoID);
  }

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="inicio_catalogo">
      <div className="container_register_catalogo">
        <h1>Catalogo de Tipos de Productos</h1>
        <div className="mb-3">
          <h3 className="titulos">Nombre Producto</h3>
          <input
            onChange={(event) => {
              setTipoProducto(event.target.value);
            }}
            type="text" value={NombreTipoProducto} placeholder="Tipo Producto" aria-label="Tipo Produccto" />
        </div>
        <div className="mb-3 d-flex justify-content-center">
          {
            editar === true ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button onClick={add}>Guardar</button>
          }
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo Producto</th>
              <th scope="col">acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              NombreTipoProductoList.map((val, key) => {
                return <tr key={val.TipoProductoID}>
                  <th scope="row">{val.TipoProductoID}</th>
                  <td>{val.NombreTipoProducto}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button
                        onClick={() => {
                          editarList(val);
                        }}
                        type="button" className="btn btn-warning">Editar</button>
                      <button
                        onClick={() => {
                          eliminar(val.TipoProductoID);
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

export default CatalogoProductos;