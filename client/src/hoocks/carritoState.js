
import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cantidades2, setCantidades] = useState({}); //Nuevo
  const [descuentoGlobal, setDescuentoGlobal] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setCantidades({ ...cantidades2, [producto.ProductoID]: 1 });
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(function(item) {
      return item.ProductoID !== productoId;
    });
    //const nuevoCarrito = carrito.splice(productoId, 1);
    setCarrito(nuevoCarrito);
  };

  // Nueva función para actualizar las cantidades
  const actualizarCantidad = (productoId, cantidad) => {
    setCantidades({ ...cantidades2, [productoId]: cantidad });
  };



  return (
    <CarritoContext.Provider value={{ carrito,cantidades2,descuentoGlobal, setDescuentoGlobal, agregarAlCarrito, eliminarDelCarrito,actualizarCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
};