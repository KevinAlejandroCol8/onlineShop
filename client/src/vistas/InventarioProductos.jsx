
import { useEffect, useState } from "react"
import axios from "axios"

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Inventario.css'


const InventarioProductos = () => {
    const MySwal = withReactContent(Swal);
    const [productosList, setProductosList] = useState([]);

    const getLista = () => {
        axios.get("http://localhost:3001/Inventario/listProduct").then((response) => {
            setProductosList(response.data);
        })
    }

    useEffect(() => {
        getLista();
    }, []);

    return (
        <>
            <br></br>
            <div className="inicio_inventario">
                <div className="container_register_inventario">
                    <h1>Inventario</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre Producto</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">CostoAdquisicion</th>
                                <th scope="col">PrecioVenta</th>
                                <th scope="col">Cantidad Disponible</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productosList.map((val, key) => {
                                    return <tr key={val.ProductoID}>
                                        <th scope="row">{val.ProductoID}</th>
                                        <td data-label="Nombre Producto">{val.NombreProducto}</td>
                                        <td>{val.DescripcionProducto}</td>
                                        <td>{val.CostoAdquisicion}</td>
                                        <td>{val.PrecioVenta}</td>
                                        <td>{val.CantidadDisponible}</td>
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

export default InventarioProductos;