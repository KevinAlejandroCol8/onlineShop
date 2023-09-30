// carritoState.js

import { useState } from 'react';

// Estado inicial del carrito
const initialCarrito = [];

// Función para agregar un producto al carrito
export function agregarAlCarrito(producto, carrito, setCarrito) {
  setCarrito([...carrito, producto]);
}

// Función para eliminar un producto del carrito por índice
export function eliminarDelCarrito(index, carrito, setCarrito) {
  const nuevoCarrito = [...carrito];
  nuevoCarrito.splice(index, 1);
  setCarrito(nuevoCarrito);
}

// Exporta el estado del carrito y las funciones
export function useCarrito() {
  const [carrito, setCarrito] = useState(initialCarrito);

  return { carrito, setCarrito };
}
