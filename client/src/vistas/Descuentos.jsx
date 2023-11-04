import { useEffect, useState } from "react"
import axios from "axios"

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Descuentos.css'


const Descuentos = () => {
  /*Campos de la base de datos*/
  const [NombreDescuento, setNombreDescuento] = useState("");
  const [PorcentajeDescuento, setPorcentajeDescuento] = useState("");
  const [Codigo_Descuento, setCodigo_Descuento] = useState("");
  const [DescuentoID, setDescuentoID] = useState("");
  /*Fin campos*/

  /*Lista elementos a mostrar*/
  const [descuentosList, setDescuentosList] = useState([]); //Lista
  /*Fin lista a mostrar*/
  const [editar, setEditar] = useState(false);

  const MySwal = withReactContent(Swal);

  const add = () => {
    axios.post("http://localhost:3001/descuentos/create", {
      NombreDescuento: NombreDescuento,
      PorcentajeDescuento: PorcentajeDescuento,
      Codigo_Descuento : Codigo_Descuento
    }).then(() => {
      getLista();
      limpiar();
      //alert("Empleado Registrado");
      MySwal.fire({
        title: <p>Registro</p>,
        html: <i>Su registro fue guardo con exito</i>,
        icon: 'success'
      });
    })
  }

  const update = () => {
    axios.put("http://localhost:3001/descuentos/update", {
      NombreDescuento: NombreDescuento,
      PorcentajeDescuento: PorcentajeDescuento,
      Codigo_Descuento: Codigo_Descuento,
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

  const limpiar = () => {
    setEditar(false);
    setNombreDescuento("");
    setPorcentajeDescuento("");
    setDescuentoID("");
    setCodigo_Descuento("");
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
    setCodigo_Descuento(val.Codigo_Descuento);
    setDescuentoID(val.DescuentoID);
  }

  useEffect(() => {
    getLista();
  }, []);

  return (
    <>
      <div className="inicio_descuentos">
        <div className="container_register_descuentos">
          <h1>Descuentos</h1>
          <div className="mb-3">
            <h3 className="titulos">Nombre del Descuento</h3>
            <input
              onChange={(event) => {
                setNombreDescuento(event.target.value);
              }}
              value={NombreDescuento} type="text"  id="NombreDescuento" placeholder="Nombre del Descuento" />
          </div>
          <div className="mb-3">
            <h3 className="titulos">% Descuento</h3>
            <input
              onChange={(event) => {
                setPorcentajeDescuento(event.target.value);
              }}
              value={PorcentajeDescuento} type="text" id="Codigo_Descuento" placeholder="Porcentaje de descuento" />
          </div>
          <div className="mb-3">
            <h3 className="titulos">Codigo de Descuento</h3>
            <input
              onChange={(event) => {
                setCodigo_Descuento(event.target.value);
              }}
              value={Codigo_Descuento} type="text"  id="Codigo_Descuento" placeholder="Codigo de Descuento" />
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
          <br></br>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre Del Descuento</th>
                <th scope="col">% Procentaje</th>
                <th scope="col">Codigo Descuento</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                descuentosList.map((val, key) => {
                  return <tr key={val.DescuentoID}>
                    <th scope="row">{val.DescuentoID}</th>
                    <td>{val.NombreDescuento}</td>
                    <td>{val.PorcentajeDescuento}</td>
                    <td>{val.Codigo_Descuento}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button
                          onClick={() => {
                            editarList(val);
                          }}
                          type="button" className="btn btn-warning">Editar</button>
                        <button
                          onClick={() => {
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
        </div>
      </div>
    </>
  );
}

export default Descuentos;