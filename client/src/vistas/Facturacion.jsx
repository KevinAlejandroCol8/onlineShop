import React, { useRef } from 'react';
import { useCarrito } from "../hoocks/carritoState";
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '../hoocks/AuthContext';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import '../css/Facturacion.css'

const Facturacion = () => {

    const MySwal = withReactContent(Swal);

    const conponentPDF = useRef();
    const fechaActual = new Date();
    const numeroAleatorio = Math.floor(Math.random() * 1000000) + 1;
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
    const dia = fechaActual.getDate();
    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

    /*Valores usuario*/
    const { direccionList } = useAuth();


    const IVA_RATE = 0.12; // Tasa de IVA del 12%
    const { carrito, cantidades2,descuentoGlobal } = useCarrito();

    const calcularSubtotal = (producto) => {
        return producto.PrecioVenta * cantidades2[producto.ProductoID];
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

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: 'Userdata',
        onAfterPrint: () => MySwal.fire({
            title: <p>Reporteria</p>,
            html: <i>Gracias por comprar con nosotros</i>,
            icon: 'success'
        })
            //alert('PDF generado con éxito')
    });


    return (
        <div className="inicio_factura" id="factura">
                <div ref={conponentPDF}className="invoice-box container_register_facturacion">
                    <table cellpadding="0" cellspacing="0">
                        <tr className="top">
                            <td colspan="4">
                                <table>
                                    <tr>
                                        <td class="title">
                                            <img src="../img/1696568622883.png" alt=""></img>
                                        </td>
                                        <td>Factura #:{numeroAleatorio} <br></br>Creada:{fechaFormateada}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr class="top">
                            <td colspan="4">
                                <table>
                                    <tr>
                                        <td>
                                            {direccionList.Direccion}
                                        </td>
                                        <td>
                                        {direccionList.NombreUsuario}<br></br>{direccionList.NombreCompleto}<br></br>{direccionList.CorreoElectronico}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr class="heading">
                            <td>Articulo</td>
                            <td>Costo Unitario</td>
                            <td>Cantidad</td>
                            <td>Precio Total</td>
                        </tr>
                        {carrito.map((producto, index) => (
                            <tr class="item" key={producto.ProductoID}>
                                <td><h5 className=" ">{producto.NombreProducto}</h5></td>
                                <td><h5>Q.{producto.PrecioVenta.toFixed(2)}</h5></td>
                                <td><h5>{cantidades2[producto.ProductoID]}</h5></td>
                                <td>Q.{calcularSubtotal(producto).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr class="total">
                            <td colspan="3"></td>
                            <td>IVA: Q.{calcularIVA().toFixed(2)}</td>
                        </tr>
                        <tr class="total">
                            <td colspan="3"></td>
                            <td>Descuento: Q.{descuentoGlobal}</td>
                        </tr>
                        <tr class="total">
                            <td colspan="3"></td>
                            <td>Total: Q.{(calcularTotalSubtotal() + calcularIVA() - descuentoGlobal).toFixed(2)}</td>
                        </tr>
                    </table>

            </div>
            <div className='d-grid d-md-flex justify-content-md-end mb-3'>
                <button   onClick={generatePDF}>PDF</button>
            </div>

        </div>

    );
};

export default Facturacion;