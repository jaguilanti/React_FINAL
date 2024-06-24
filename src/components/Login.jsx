import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (data) => {
    try {
      const { email, password } = data;

      // Iniciar sesión en Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Actualizar el estado para indicar que el usuario ha iniciado sesión correctamente
      setLoggedIn(true);

      console.log('Usuario autenticado:', userCredential.user.email);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
    }
  };

  if (loggedIn) {
    // Redirigir a otra página o mostrar un mensaje de éxito
    return <p>Iniciaste sesión correctamente.</p>;
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="email" placeholder="Email" {...register('email', { required: true })} />
      <input type="password" placeholder="Contraseña" {...register('password', { required: true })} />
      {error && <p>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
