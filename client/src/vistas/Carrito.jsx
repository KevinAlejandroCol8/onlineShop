import React, { useEffect, useState } from "react";
import { useCarrito } from "../hoocks/carritoState";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import '../css/Carrito_final.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { IconoEliminar } from "../hoocks/iconos";

const IVA_RATE = 0.12; // Tasa de IVA del 12%

const Carrito = () => {

    const navigate = useNavigate();
    //const [cantidades, setCantidades] = useState({}); // Estado para mantener las cantidades
    const { carrito, eliminarDelCarrito, cantidades2, actualizarCantidad } = useCarrito();

    const [codigoDescuento, setCodigoDescuento] = useState('');
    const [descuentos, setDescuentos] = useState(null);

    

    //console.log('Esto es el carrito ', carrito)
    //console.log(JSON.stringify(carrito, null, 2));
    //console.log('Esto es la cantidad ',cantidades2)
    
    useEffect(() => {
        const cantidadesPredeterminadas = {};
        carrito.forEach((producto) => {
            cantidadesPredeterminadas[producto.ProductoID] = 1;
        });
        //setCantidades(cantidadesPredeterminadas);
    }, [carrito]);

    if (!carrito || carrito.length === 0) {
        return (
            <div className="small-container cart-page">
                <p>El carrito está vacío</p>
            </div>
        );
    }

    /*const handleCantidadChange = (productoId, cantidad) => {
        setCantidades({ ...cantidades, [productoId]: cantidad });
    };*/

    const cambiarCantidades = (productoId, cantidad2) => {
        console.log('ID producto ', productoId, 'Cantidad modificada ', cantidad2);
        //setCantidades({ ...cantidades, [productoId]: cantidad2 });
        actualizarCantidad(productoId, cantidad2);
    };

    // Función para calcular el subtotal de un producto en una línea
    const calcularSubtotal = (producto) => {
        return producto.PrecioVenta * cantidades2[producto.ProductoID];
    };

    const handleEliminarProducto = (productoId) => {
        // Llama a la función para eliminar el producto del carrito
        eliminarDelCarrito(productoId);
    };

    const calcularTotalSubtotal = () => {
        let totalSubtotal = 0;
        carrito.forEach((producto) => {
            totalSubtotal += calcularSubtotal(producto);
        });
        return totalSubtotal;
    };

    const calcularIVA = () => {
        const totalSubtotal = calcularTotalSubtotal();
        return totalSubtotal * IVA_RATE;
    };

    const buscarDescuento = () => {
        console.log(codigoDescuento);
        axios
            .get(`http://localhost:3001/descuentos/lista/${codigoDescuento}`)
            .then((response) => {
            // Actualizar el estado de descuentos con la respuesta de la API
                setDescuentos(response.data);
            //console.log(response.data);
            })
            .catch((error) => {
             console.error("Error al obtener los descuentos:", error);
            });
        //console.log('cambios ',descuentos[0].PorcentajeDescuento)
    };

    const calcularDescuento = (producto) => {
        if (descuentos && Array.isArray(descuentos) && descuentos.length > 0 && descuentos[0].PorcentajeDescuento) {
            return (
                (((calcularTotalSubtotal() + calcularIVA()) * descuentos[0].PorcentajeDescuento) / 100)
            ).toFixed(2);
        } else {
            return "0.00"; // o cualquier otro valor por defecto
        }
    };

    return (
        <> <div className="carrito-final">
            <section id="blog-home" class="mt-5 container">
                <h2 class="titulo-carrito">Carrito de Compras</h2>
            </section>
            <section id="cart-container" class="container my-5">
                <table width="100%">
                    <thead>
                        <tr>
                            <td>Eliminar</td>
                            <td>Imagen</td>
                            <td>Producto</td>
                            <td>Precio Unitario</td>
                            <td>Cantidad</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    {carrito.map((producto, index) => (
                        <tbody>
                            <tr key={producto.ProductoID}>
                                {/*<td>
                                    <svg class="eliminar-boton" onClick={() => handleEliminarProducto(producto.ProductoID)} xmlns="http://www.w3.org/2000/svg" height="2.5em" viewBox="0 0 448 512">
                                    <path d={IconoEliminar} /></svg>
                                </td>*/}
                                <td>
                                    <svg class="eliminar-boton" onClick={() => handleEliminarProducto(producto.ProductoID)} xmlns="http://www.w3.org/2000/svg" height="2.5em" viewBox="0 0 448 512">
                                        <path d={IconoEliminar} /></svg>
                                </td>
                                <td><img src={`http://localhost:3001/productos/imagen/${producto.Imagen}`} alt={producto.NombreProducto} /></td>
                                <td>
                                    <h5 className="textoLinea">{producto.NombreProducto}</h5>
                                </td>
                                <td>
                                    <h5>Q.{producto.PrecioVenta.toFixed(2)}</h5>
                                </td>
                                <td>
                                    {/*<input className="miniImput2" placeholder="0" class="w-25 pl-1" type="text" value={cantidades[producto.ProductoID] || 0}
                                        onChange={(e) => handleCantidadChange(producto.ProductoID, parseInt(e.target.value))} />*/}
                                    <input className="miniImput2" placeholder="0" class="w-25 pl-1" type="text" value={cantidades2[producto.ProductoID]}
                                        onChange={(e) => cambiarCantidades(producto.ProductoID, parseInt(e.target.value))} />
                                </td>
                                <td>
                                    {/*<input className="miniImput2" placeholder="0" class="w-25 pl-1" type="text" value={cantidades2[producto.ProductoID]}
                                        onChange={(e) => cambiarCantidades(producto.ProductoID, parseInt(e.target.value))} />*/}
                                    Q.{calcularSubtotal(producto).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </section>
            <section id="cart-bottom" class="container">
                <div className="row">
                    <div className="coupon col-lg-6 col-md-6 col-12 mb-4">
                        <div>
                            <h5>Cupón de descuento</h5>
                            <p>Ingrese su cupón si tiene uno</p>
                            <input className="miniImput" type="text" placeholder="Código de Cupón"
                                onChange={(event) => {
                                    setCodigoDescuento(event.target.value);
                                }}
                                value={codigoDescuento}
                            />
                            <button class="botton1" onClick={buscarDescuento} >APLICAR CUPÓN</button>
                        </div>
                    </div>
                    <div className="total col-lg-6 col-md-6 col-12 mb-4">
                        <div>
                            <h5>Total del Carrito</h5>
                            <div className="d-flex justify-content-between">
                                <h6>Subtotal</h6>
                                <p>Q.{calcularTotalSubtotal().toFixed(2)}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6>IVA</h6>
                                <p>Q.{calcularIVA().toFixed(2)}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h6>Descuento</h6>
                                <p>Q.{calcularDescuento()}</p>
                            </div>
                            <hr class="second-hr" />
                            <div className="d-flex justify-content-between">
                                <h6>TOTAL</h6>
                                <p>Q.{((calcularTotalSubtotal() + calcularIVA()) - calcularDescuento()).toFixed(2)}</p>
                            </div>

                            <button onClick={() => navigate("/Payment")} class="botton2 ml-auto">PROCEDER AL PAGO</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        </>
    );
}

export default Carrito;