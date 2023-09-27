import '../css/Carrito_final.css'

const carritofinal = () => {
    return (
        <div class="small-container cart-page">
        <table>
            <tr className='encabezado'>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>

            <tr>
                <td>
                    <div class="cart-info">
                        <img src="https://i.ibb.co/B3vYjvw/buy-1.jpg" alt="" />
                        <div>
                            <p>Red Printed T-Shirt</p>
                            <small>Price Q500.00</small>
                            <br />
                            <a href="#">Eliminar</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" /></td>
                <td>Q500.00</td>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="https://i.ibb.co/qmSHWx7/buy-2.jpg" alt="" />
                        <div>
                            <p>HRX Shoes</p>
                            <small>Price Q1500.00</small>
                            <br />
                            <a href="#">Eliminar</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" /></td>
                <td>Q1500.00</td>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="https://i.ibb.co/NyYtY31/buy-3.jpg" alt="" />
                        <div>
                            <p>Reebok Tracksuit</p>
                            <small>Price Q1500.00</small>
                            <br />
                            <a href="#">Eliminar</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" /></td>
                <td>Q1500.00</td>
            </tr>
        </table>

        <div class="total-price">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>Q3500.00</td>
                </tr>
                <tr>
                    <td>IVA</td>
                    <td>Q15.00</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>Q3515.00</td>
                </tr>
            </table>
        </div>
    </div>
    );
}

export default carritofinal;