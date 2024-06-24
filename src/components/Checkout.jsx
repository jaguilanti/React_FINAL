import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [pedidoId, setPedidoId] = useState("");
    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [contador, setContador] = useState(10);

    useEffect(() => {
        let interval = null;

        if (pedidoId) {
            interval = setInterval(() => {
                setContador((prevContador) => {
                    if (prevContador > 0) {
                        return prevContador - 1;
                    } else {
                        clearInterval(interval);
                        navigate('/'); // Redireccionar a la página de inicio al finalizar el contador
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [pedidoId, navigate]);

    const comprar = async (data) => {
        // Verificar si los campos están completos
        if (!data.nombre || !data.email || !data.telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos requeridos.',
                confirmButtonText: 'OK'
            });
            return; // Detener la ejecución si falta alguno de los campos
        }

        const pedido = {
            cliente: data,
            productos: carrito,
            total: precioTotal()
        };

        const pedidosRef = collection(db, "pedidos");

        try {
            const doc = await addDoc(pedidosRef, pedido);
            setPedidoId(doc.id);
            vaciarCarrito();
            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                html: `Tu número de pedido es: ${doc.id}. Serás redirigido a la página de inicio en <span id="swal-timer">${contador}</span> segundos.`,
                timer: contador * 1000, 
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                    navigate('/'); // Redireccionar a la página de inicio
                }
            });

        } catch (error) {
            console.error("Error al enviar pedido a Firestore:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="main-title">Finalizar compra</h1>
            <form className="formulario" onSubmit={handleSubmit(comprar)}>

                <input type="text" placeholder="Ingresá tu nombre" {...register("nombre", { required: true })} />
                <input type="email" placeholder="Ingresá tu e-mail" {...register("email", { required: true })} />
                <input type="phone" placeholder="Ingresá tu teléfono" {...register("telefono", { required: true })} />

                <button className="enviar" type="submit">Comprar</button>

            </form>
        </div>
    );
};

export default Checkout;

