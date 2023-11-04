import React, { useEffect, useState } from "react";
import { useAuth } from '../hoocks/AuthContext';
import { useCarrito } from "../hoocks/carritoState";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import '../css/Carrito_final.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { IconoEliminar } from "../hoocks/iconos";

const IVA_RATE = 0.12; // Tasa de IVA del 12%

const Carrito = () => {

    //Generales
    const { codigoUser } = useAuth();
    
    //Pedidos 
    const [ PedidoID, setPedidoID ] = useState("");

    const navigate = useNavigate();
    const { carrito, eliminarDelCarrito, cantidades2, actualizarCantidad,montoDescuento } = useCarrito();
    const [codigoDescuento, setCodigoDescuento] = useState('');
    const [descuentos, setDescuentos] = useState(null);

    
    //console.log("Info ",carrito);
    useEffect(() => {
        const cantidadesPredeterminadas = {};
        carrito.forEach((producto) => {
            cantidadesPredeterminadas[producto.ProductoID] = 1;
        });
        //setCantidades(cantidadesPredeterminadas);
        const numero = Math.floor(Math.random() * 10000); // Genera un número entre 0 y 9999
        setPedidoID(numero);
    }, [carrito]);

    if (!carrito || carrito.length === 0) {
        return (
            <div className="small-container cart-page">
                <p>El carrito está vacío</p>
            </div>
        );
    }

    //Calculos
    /*
    const cambiarCantidades = (productoId, cantidad2) => {
        console.log('ID producto ', productoId, 'Cantidad modificada ', cantidad2);
        //setCantidades({ ...cantidades, [productoId]: cantidad2 });
        actualizarCantidad(productoId, cantidad2);
    };
    */
    const cambiarCantidades = (productoId, cantidad2) => {
        console.log('ID producto ', productoId, 'Cantidad modificada ', cantidad2);
        
        // Encuentra el producto en el carrito para obtener la cantidad disponible
        const producto = carrito.find(p => p.ProductoID === productoId);
        
        if (producto) {
            if (cantidad2 > producto.CantidadDisponible) {
                alert(`La cantidad no puede ser mayor a la disponible (${producto.CantidadDisponible} en stock).`);
                // Puedes decidir si quieres restablecer a la cantidad máxima disponible o simplemente no actualizar
                actualizarCantidad(productoId, producto.CantidadDisponible);
            } else {
                // Todo está bien, actualiza la cantidad
                actualizarCantidad(productoId, cantidad2);
            }
        } else {
            console.error('Producto no encontrado en el carrito');
        }
    };

    // Función para calcular el subtotal de un producto en una línea
    const calcularSubtotal = (producto) => {
        return producto.PrecioVenta * cantidades2[producto.ProductoID];
    };

    //Eliminar Productos
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
        //console.log(codigoDescuento);
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

    const calcularDescuento = () => {
        if (descuentos && Array.isArray(descuentos) && descuentos.length > 0 && descuentos[0].PorcentajeDescuento) {
            return (
                (((calcularTotalSubtotal() + calcularIVA()) * descuentos[0].PorcentajeDescuento) / 100)
            ).toFixed(2);
        } else {
            return "0.00"; // o cualquier otro valor por defecto
        }
    };


    const addPedido = () => {
        axios.post("http://localhost:3001/Pedidos/createPedido", {
            PedidoID: PedidoID,
            UsuarioID: codigoUser,
            TotalPedido: ((calcularTotalSubtotal() + calcularIVA()) - calcularDescuento()).toFixed(2)
        }).then(() => {
            //limpiar();
            alert("Registro Guardar");
        })
    }

    const addDetallePedido = (detalles) => {
        axios.post("http://localhost:3001/Pedidos/createDetalle", detalles)
        .then(() => {
            alert("Registro Guardado");
        })
        .catch((error) => {
            console.error("Error al guardar el detalle del pedido:", error);
        });
    }
    
    const guardarDetallesPedido = () => {
        // Mapear cada producto a la estructura que espera tu API
        const detallesPedido = carrito.map((producto) => ({
            PedidoID: PedidoID,
            ProductoID: producto.ProductoID,
            CantidadProducto: cantidades2[producto.ProductoID],
            PrecioUnitario: producto.PrecioVenta
        }));
    
        // Ahora enviar cada detalle de producto individualmente
        // Si tu API puede manejar múltiples registros en una sola solicitud, podrías enviar el array completo.
        detallesPedido.forEach(detalle => {
            addDetallePedido(detalle);
        });
    }

    const envioPago = () => {
        addPedido();
        guardarDetallesPedido();
        montoDescuento(calcularDescuento());
        navigate("/Payment");
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
                                    <input className="miniImput2" placeholder="0" class="w-25 pl-1" type="number" value={cantidades2[producto.ProductoID]}
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

                            {/*<button onClick={() => navigate("/Payment")} class="botton2 ml-auto">PROCEDER AL PAGO</button>*/}
                            <button onClick={envioPago} class="botton2 ml-auto">PROCEDER AL PAGO</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        </>
    );
}

export default Carrito;