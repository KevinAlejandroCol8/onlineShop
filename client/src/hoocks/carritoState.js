
import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (productoId) => {
    console.log("origianl ",carrito);
    const nuevoCarrito = carrito.filter((producto) => {
      console.log("producto.id:", producto.id);
      console.log("productoId:", productoId);
      return producto.id == productoId;
    });
    console.log("nuevo carrito  ",nuevoCarrito);
    setCarrito(nuevoCarrito);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};