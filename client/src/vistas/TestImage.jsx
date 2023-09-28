import React, { useEffect, useState } from "react";
import axios from "axios";

const TestImage = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos

  useEffect(() => {
    // Realiza una solicitud a tu API para obtener la lista de productos
    axios.get("http://localhost:3001/productos/lista").then((response) => {
      setProductos(response.data); // Almacena la lista de productos en el estado
    });
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      {productos.map((producto) => (
        <div key={producto.ProductoID}>
          <p>Nombre del Producto: {producto.NombreProducto}</p>
          <p>Descripción: {producto.DescripcionProducto}</p>
          <p>Precio: {producto.PrecioVenta}</p>

          {/* Mostrar la imagen */}
          {producto.Imagen && (
            <img
              src={`http://localhost:3001/${producto.Imagen}`}
              width="300" // Establece el ancho deseado
              height="300" // Establece la altura deseada
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TestImage;
