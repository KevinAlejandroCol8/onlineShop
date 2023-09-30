import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../css/Carrito_final.css'

const IVA_RATE = 0.12; // Tasa de IVA del 12%

const Carrito = () => {
    const location = useLocation();
    const { carrito: carritoInicial } = location.state || {};

    // Usamos useState para mantener el estado del carrito
    const [carrito, setCarrito] = useState(carritoInicial);

    if (!carrito || carrito.length === 0) {
        return (
            <div className="small-container cart-page">
                <p>El carrito está vacío</p>
            </div>
        );
    }

    // Función para calcular el subtotal de un producto en una línea
    const calcularSubtotal = (producto) => {
        return producto.PrecioVenta * producto.Cantidad;
    };

    const eliminarProducto = (index) => {
        const nuevoCarrito = [...carrito];
        nuevoCarrito.splice(index, 1); // Elimina el producto en el índice especificado
        setCarrito(nuevoCarrito);
    };

    const actualizarCantidad = (index, nuevaCantidad) => {
        const nuevoCarrito = [...carrito];
        nuevoCarrito[index].Cantidad = nuevaCantidad;
        setCarrito(nuevoCarrito);
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
        <div className="small-container cart-page">
            <table>
                <thead>
                    <tr className='encabezado'>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {carrito.map((producto, index) => (
                        <tr key={producto.ID}>
                        <td>
                            <div className="cart-info">
                            <img
                                src={`http://localhost:3001/productos/imagen/${producto.Imagen}`}
                                alt={producto.NombreProducto}
                            />
                            <div>
                                <p>{producto.NombreProducto}</p>
                                <small>Price Q.{producto.PrecioVenta.toFixed(2)}</small>
                            </div>
                            </div>
                        </td>
                        <td>
                            <input
                                type="number"
                                value={producto.Cantidad}
                                onChange={(e) => actualizarCantidad(index, parseInt(e.target.value, 10))}
                            />
                        </td>
                        <td>Q.{calcularSubtotal(producto).toFixed(2)}</td>
                        <td>
                            <button onClick={() => eliminarProducto(index)}>Eliminar</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-price">
                <table>
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>Q.{calcularTotalSubtotal().toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>IVA</td>
                            <td>Q.{calcularIVA().toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>Q.{(calcularTotalSubtotal() + calcularIVA()).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Carrito;