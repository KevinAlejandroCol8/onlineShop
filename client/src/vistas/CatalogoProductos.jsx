import { useEffect,useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'


const CatalogoProductos = () => {
    /*Cmapos de la base de datos*/
  const [NombreTipoProducto, setTipoProducto] = useState("");
  const [TipoProductoID, setTipoProductoID] = useState("");
  /*Fin campos*/
  /*Lista elementos a mostrar*/
  const [NombreTipoProductoList, setTipoProductoList] = useState([]); //Lista
  /*Fin lista a mostrar*/
  const [editar, setEditar] = useState(false)

  /*const mostrarDatos = () =>{
    alert(nombre);
  }*/

  const add = () => {
    axios.post("http://localhost:3001/tiposProductos/create", {
        NombreTipoProducto: NombreTipoProducto
    }).then(() => {
      getLista();
      limpiar();
      //alert("Empleado Registrado");
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

  const limpiar = () =>{
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
    <div className="container">
      <br></br>
      <div className="card text-center">
        <div className="card-header">
          Catalogo de Tipos de Productos 
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre Producto</span>
            <input
              onChange={(event) => {
                setTipoProducto(event.target.value);
              }}
              type="text" value={NombreTipoProducto} className="form-control" placeholder="Tipo Producto" aria-label="Tipo Produccto" aria-describedby="basic-addon1" />
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
                      onClick={()=>{
                        editarList(val);
                      }}
                      type="button" className="btn btn-warning">Editar</button>
                    <button 
                      onClick={()=>{
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
      <button className='btn btn-success' onClick={getLista}>Lista</button>      
    </div>
  );
}

export default CatalogoProductos;