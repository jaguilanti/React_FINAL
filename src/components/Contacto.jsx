import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const Contacto = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const enviar = async (data) => {
        if (!data.nombre || !data.email || !data.telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos requeridos.',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const contactoNuevo = {
                nombre: data.nombre,
                email: data.email,
                telefono: data.telefono
            };

            const docRef = await addDoc(collection(db, "contactos"), contactoNuevo);
            console.log("Datos enviados correctamente a Firestore con ID:", docRef.id);
           
            reset(); 

            Swal.fire({
                icon: 'success',
                title: 'Datos enviados correctamente',
                text: `Los datos se enviaron correctamente a Firestore con ID: ${docRef.id}`,
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error("Error al enviar datos a Firestore:", error,errors);
            
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar datos',
                text: 'Hubo un problema al intentar enviar los datos. Por favor, intenta nuevamente más tarde.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container">
            <h1 className="main-title">Dejanos tus datos, nosotros te contactamos!!</h1>
            <form className="formulario" onSubmit={handleSubmit(enviar)}>

                <input type="text" placeholder="Ingresá tu nombre" {...register("nombre", { required: true })} />

                <input type="email" placeholder="Ingresá tu e-mail" {...register("email", { required: true })} />

                <input type="tel" placeholder="Ingresá tu teléfono" {...register("telefono", { required: true })} />

                <button className="enviar" type="submit">Enviar</button>

            </form>
        </div>
    );
};

export default Contacto;

