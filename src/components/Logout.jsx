import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Usuario desconectado');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default Logout;
