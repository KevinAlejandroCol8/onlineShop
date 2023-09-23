import { useEffect,useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'


const Descuentos = () => {
    /*Cmapos de la base de datos*/
  const [NombreDescuento, setNombreDescuento] = useState("");
  const [PorcentajeDescuento, setPorcentajeDescuento] = useState("");
  const [DescuentoID, setDescuentoID] = useState("");
  /*Fin campos*/

  /*Lista elementos a mostrar*/
  const [descuentosList, setDescuentosList] = useState([]); //Lista
  /*Fin lista a mostrar*/
  const [editar, setEditar] = useState(false)

  /*const mostrarDatos = () =>{
    alert(nombre);
  }*/

  const add = () => {
    axios.post("http://localhost:3001/descuentos/create", {
        NombreDescuento: NombreDescuento,
        PorcentajeDescuento: PorcentajeDescuento
    }).then(() => {
      getLista();
      limpiar();
      //alert("Empleado Registrado");
    })
  }

  const update = () => {
    axios.put("http://localhost:3001/descuentos/update", {
        NombreDescuento: NombreDescuento,
        PorcentajeDescuento: PorcentajeDescuento,
        DescuentoID: DescuentoID
    }).then(() => {
      getLista();
      limpiar();
    })
  }

  const eliminar = (DescuentoID) => {
    axios.delete(`http://localhost:3001/descuentos/eliminar/${DescuentoID}`).then(() => {
        getLista();
    })
  }

  const limpiar = () =>{
    setEditar(false);
    setNombreDescuento("");
    setPorcentajeDescuento("");
    setDescuentoID("");
  }

  const getLista = () => {
    axios.get("http://localhost:3001/descuentos/lista").then((response) => {
        setDescuentosList(response.data);
    })
  }

  const editarList = (val) => {
    setEditar(true);
    setNombreDescuento(val.NombreDescuento);
    setPorcentajeDescuento(val.PorcentajeDescuento);
    setDescuentoID(val.sPorcentajeDescuento);
  }

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="container">
      <br></br>
      <div className="card text-center">
        <div className="card-header">
          Catalogo de descuentos
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre del Descuento</span>
            <input
              onChange={(event) => {
                setNombreDescuento(event.target.value);
              }}
              type="text" value={NombreDescuento} className="form-control" placeholder="Nombre Descuento" aria-label="Nombre Descuento" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">% Descuento</span>
            <input
              onChange={(event) => {
                setPorcentajeDescuento(event.target.value);
              }}
              type="text" value={PorcentajeDescuento} className="form-control" placeholder="% Descuento" aria-label="% Descuento" aria-describedby="basic-addon1" />
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
            <th scope="col">Nombre Descuento</th>
            <th scope="col">% Procentaje</th>
            <th scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            descuentosList.map((val, key) => {
              return <tr key={val.DescuentoID}>
                <th scope="row">{val.DescuentoID}</th>
                <td>{val.NombreDescuento}</td>
                <td>{val.PorcentajeDescuento}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button 
                      onClick={()=>{
                        editarList(val);
                      }}
                      type="button" className="btn btn-warning">Editar</button>
                    <button 
                      onClick={()=>{
                        eliminar(val.DescuentoID);
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

export default Descuentos;