import React, { useState, useEffect } from "react";
import { useCarrito } from "../hoocks/carritoState";

import '../css/Carrito_final.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const IVA_RATE = 0.12; // Tasa de IVA del 12%

const Carrito = () => {

    const [cantidades, setCantidades] = useState({}); // Estado para mantener las cantidades
    const { carrito, eliminarDelCarrito } = useCarrito();


    useEffect(() => {
        const cantidadesPredeterminadas = {};
        carrito.forEach((producto) => {
            cantidadesPredeterminadas[producto.ProductoID] = 1;
        });
        setCantidades(cantidadesPredeterminadas);
    }, [carrito]);

    if (!carrito || carrito.length === 0) {
        return (
            <div className="small-container cart-page">
                <p>El carrito está vacío</p>
            </div>
        );
    }

    const handleCantidadChange = (productoId, cantidad) => {
        setCantidades({ ...cantidades, [productoId]: cantidad });
    };

    // Función para calcular el subtotal de un producto en una línea
    const calcularSubtotal = (producto) => {
        return producto.PrecioVenta * cantidades[producto.ProductoID];
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
                                <td><svg class="eliminar-boton" onClick={() => handleEliminarProducto(producto.ProductoID)} xmlns="http://www.w3.org/2000/svg" height="2.5em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></td>
                                <td><img src={`http://localhost:3001/productos/imagen/${producto.Imagen}`} alt={producto.NombreProducto} /></td>
                                <td>
                                    <h5 className="textoLinea">{producto.NombreProducto}</h5>
                                </td>
                                <td>
                                    <h5>Q.{producto.PrecioVenta.toFixed(2)}</h5>
                                </td>
                                <td>
                                    <input className="miniImput2" placeholder="0" class="w-25 pl-1" type="text" value={cantidades[producto.ProductoID] || 0}
                                        onChange={(e) => handleCantidadChange(producto.ProductoID, parseInt(e.target.value))} />
                                </td>
                                <td>
                                    Q.{calcularSubtotal(producto).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </section>
            <section id="cart-bottom" className="container">
                <div className="row">
                    <div className="coupon mb-4">
                        <div>
                            <h5>Informacion de pago </h5>
                            <p>Numero de tarjeta</p>
                            <div class="d-flex">
                                <input type="text" className="inpTarjeta" id="cardNumber1" maxlength="4" placeholder="####" />
                                <input type="text" className="inpTarjeta" id="cardNumber2" maxlength="4" placeholder="####" />
                                <input type="text" className="inpTarjeta" id="cardNumber3" maxlength="4" placeholder="####" />
                                <input type="text" className="inpTarjeta" id="cardNumber4" maxlength="4" placeholder="####" />
                            </div>
                            <div class="d-flex">
                                <p>Fecha de vencimiento</p>
                                <div class="d-flex">
                                    <input type="text" className="inpTarjeta" id="cardNumber1" maxlength="2" placeholder="01" />
                                    <input type="text" className="inpTarjeta" id="cardNumber2" maxlength="4" placeholder="2023" />
                                </div>
                                <p>CCV</p>
                                <div class="d-flex">
                                    <input type="text" className="miniImput" id="cardNumber3" maxlength="3" placeholder="###" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="cart-bottom" class="container">
                <div className="row">
                    <div className="coupon col-lg-6 col-md-6 col-12 mb-4">
                        <div>
                            <h5>Cupón de descuento</h5>
                            <p>Ingrese su cupón si tiene uno</p>
                            <input className="miniImput" type="text" placeholder="Código de Cupón" />
                            <button class="botton1">APLICAR CUPÓN</button>
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
                                <p>Q.0</p>
                            </div>
                            <hr class="second-hr" />
                            <div className="d-flex justify-content-between">
                                <h6>TOTAL</h6>
                                <p>Q.{(calcularTotalSubtotal() + calcularIVA()).toFixed(2)}</p>
                            </div>
                            <button class="botton2 ml-auto">PROCEDER AL PAGO</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        </>
    );
}

export default Carrito;