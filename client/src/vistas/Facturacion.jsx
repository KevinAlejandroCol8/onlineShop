import React from "react";
import { useCarrito } from "../hoocks/carritoState";
import { html2pdf } from 'html2pdf.js';

import '../css/Facturacion.css'

const Facturacion = () => {

    /*tamo pdf */
    const Vwidth =  (800/96)+1;
    const Vheight=  (700/96)+1;
    
    const fechaActual = new Date();
    const numeroAleatorio = Math.floor(Math.random() * 1000000) + 1;
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
    const dia = fechaActual.getDate();
    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

   
    const IVA_RATE = 0.12; // Tasa de IVA del 12%
    const { carrito } = useCarrito();

    const calcularSubtotal = (producto) => {
        return producto.PrecioVenta * 1;
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

    const Facturar = () => {   
        let options = {
            filename: 'FACTURA.pdf',
            margin: 0.5,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: [(Vheight + (0.5 * 2)), Vwidth], orientation: 'landscape' },
        };
        html2pdf().set(options).from(document.getElementById('factura')).save(); 
    }

    return (
        <div className="inicio" id="factura">
            <div className="invoice-box container_register">
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
                                        Sparksuite, Inc.<br></br>12345 Sunny Road<br></br>Sunnyville, CA 12345
                                    </td>
                                    <td>
                                        Acme Corp.<br></br>John Doe<br></br> john@example.com
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
                            <td><h5>1</h5></td>
                            <td>Q.{calcularSubtotal(producto).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr class="total">
                        <td colspan="3"></td>
                        <td>IVA: Q.{calcularIVA().toFixed(2)}</td>
                    </tr>
                    <tr class="total">
                        <td colspan="3"></td>
                        <td>Total: Q.{(calcularTotalSubtotal() + calcularIVA()).toFixed(2)}</td>
                    </tr>
                </table>
                <button onClick={Facturar}></button>
            </div>
        </div>
    );
};

export default Facturacion;
