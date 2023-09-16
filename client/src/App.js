import './App.css';
import { useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setedad] = useState(0);
  const [pais, setpais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [empleadosList, setEmpleados] = useState([]); //Lista
  const [editar,setEditar] = useState(false)

  /*const mostrarDatos = () =>{
    alert(nombre);
  }*/

  const add = () => {
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      alert("Empleado Registrado");
    })
  }

  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    })
  }

  const editarList = (val) =>{
    setEditar(true);
  }
  //getEmpleados();

  return (
    <div className="container">
      <br></br>
      <div className="card text-center">
        <div className="card-header">
          Listado Empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input
              onChange={(event) => {
                setedad(event.target.value);
              }}
              type="text" className="form-control" placeholder="Edad" aria-label="Edad" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País</span>
            <input
              onChange={(event) => {
                setpais(event.target.value);
              }}
              type="text" className="form-control" placeholder="País" aria-label="País" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              type="text" className="form-control" placeholder="Cargo" aria-label="Cargo" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años</span>
            <input
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              type="text" className="form-control" placeholder="Años" aria-label="Años" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className='btn btn-success' onClick={add}>Guardar</button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return <tr key={val.idPrueba}>
                <th scope="row">{val.idPrueba}</th>
                <td>{val.nombre}</td>
                <td>Ot{val.edad}to</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
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
      <button className='btn btn-success' onClick={getEmpleados}>Lista</button>
    </div>
  );
}

export default App;
