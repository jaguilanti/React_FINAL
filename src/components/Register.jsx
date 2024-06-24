import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; 

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
    try {
      // Registrar usuario en Firebase Authentication
      const { email, password } = data;
      // Guardar datos adicionales en Firestore
      const usuariosRef = collection(db, 'usuarios');
      await addDoc(usuariosRef, {
        email: email,
        nombre: data.nombre,
        telefono: data.telefono,
        password: password
      });

      alert('¡Usuario registrado con éxito!');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      alert('Error al registrar usuario. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <input type="text" placeholder="Nombre" {...register('nombre', { required: true })} />
      <input type="email" placeholder="Email" {...register('email', { required: true })} />
      <input type="tel" placeholder="Teléfono" {...register('telefono', { required: true })} />
      <input type="password" placeholder="Contraseña" {...register('password', { required: true })} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
