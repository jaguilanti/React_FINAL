import React, { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(carritoInicial);

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (item, cantidad, size, color) => {
        const { id, stock, titulo } = item; // Obtener propiedades relevantes del producto

        const itemAgregado = { ...item, cantidad, size, color };

        // Verificar si el producto ya está en el carrito
        const estaEnElCarrito = carrito.find((producto) => (
            producto.id === itemAgregado.id &&
            producto.size === itemAgregado.size &&
            producto.color === itemAgregado.color
        ));

        if (estaEnElCarrito) {
            // Si está en el carrito, incrementar la cantidad si hay suficiente stock
            if (estaEnElCarrito.cantidad < stock) {
                estaEnElCarrito.cantidad += cantidad;
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${titulo} se añadió al carrito`,
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No hay suficiente stock disponible de este producto.',
                    showConfirmButton: false,
                    timer: 1200
                });
            }
        } else {
            // Si no está en el carrito, agregarlo
            if (stock > 0) {
                setCarrito([...carrito, itemAgregado]);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${titulo} se añadió al carrito`,
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${titulo} está agotado`,
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = (productId, size, color) => {
        const nuevoCarrito = carrito.filter((producto) => (
            !(producto.id === productId && producto.size === size && producto.color === color)
        ));
        setCarrito(nuevoCarrito);
    };
    

    // Función para obtener la cantidad total de productos en el carrito
    const cantidadEnCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    };

    // Función para obtener el precio total de todos los productos en el carrito
    const precioTotal = () => {
        return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    };

    // Función para vaciar completamente el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    return (
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            cantidadEnCarrito,
            precioTotal,
            vaciarCarrito
        }}>
            {children}
        </CartContext.Provider>
    );
};

